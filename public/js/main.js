(function(){
  'use strict';
  prayTimes.setMethod('ISNA');

  // Maghrib salat time in minutes after athan
  var maghrib_buffer = 10;
  var pray_times, iqama_times, m_p_time, m_i_time, n_pray_info;

  function secondlyUpdate() {
    updateClock();
    updateDateTime();
    updateNextPrayer();
    setTimeout(secondlyUpdate, 1000);
  }

  function dailyUpdate() {
    updatePrayerTime();
    setTimeout(dailyUpdate, 1000 * 60 * 60 * 24);
  }

  secondlyUpdate();
  dailyUpdate();
  displayAnnouncments();

  function displayAnnouncments() {
    helpers.asyncAnnouncements().success(function(announcments) {
      
      var $ans = $(announcments).find("td > a");

      $ans.splice(0,1);

      $ans.each(function(){
        var $html = '<div class="item"> <img src=imgs/slides/' + $(this).attr('href') + ' /> </div>';

        $('.carousel-inner').append($html);
      });

    });

    $('.carousel').carousel({
      pause: 'none',
      interval: 7500
    });
  }

  function updatePrayerTime() {
    helpers.asyncIqamas().success(function(iqamas) {
      pray_times  = prayTimes.getTimes(new Date(), [42.097718, -71.19638599999999], -5, 'auto', '12h');
      iqama_times = helpers.getIqamaRange(iqamas);
      m_p_time    = helpers.makeMoment(pray_times['maghrib']);
      m_i_time    = moment(m_p_time.add(maghrib_buffer, 'm')).format("h:mm a");
      n_pray_info = helpers.nextPrayerInfo(iqama_times, pray_times, m_i_time);
      
      $("#t_fajr")     .text(pray_times['fajr']);
      $("#t_sunrise")  .text(pray_times['sunrise']);
      $("#t_dhuhr")    .text(pray_times['dhuhr']);
      $("#t_asr")      .text(pray_times['asr']);
      $("#t_maghrib")  .text(pray_times['maghrib']);
      $("#t_isha")     .text(pray_times['isha']);

      $("#i_fajr")     .text(iqama_times['fajr']);
      $("#i_dhuhr")    .text(iqama_times['dhuhr']);
      $("#i_asr")      .text(iqama_times['asr']);
      $("#i_isha")     .text(iqama_times['isha']);
      
      $("#i_maghrib")  .text(m_i_time);

    });
    
  }

  function updateNextPrayer() {
    if (n_pray_info) {
      $("#next_prayer").text(n_pray_info['prayer']);
      $("#n_prayer_a") .text(n_pray_info['arabic']);
      $("#athan_mins") .text(n_pray_info['athan']);
      $("#salat_mins") .text(n_pray_info['iqama']);
    }
  }

  function updateClock() {
    var now = moment(),
        second = now.seconds() * 6,
        minute = now.minutes() * 6 + second / 60,
        hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

    $('#hour').css("transform", "rotate(" + hour + "deg)");
    $('#minute').css("transform", "rotate(" + minute + "deg)");
    $('#second').css("transform", "rotate(" + second + "deg)");
  }

  function updateDateTime() {
    $("#date").text(moment().format("dddd, MMMM Do YYYY -- iDo iMMMM iYYYY"));
    $("#time").text(moment().format("h:mm:ss a"));
  }

})();