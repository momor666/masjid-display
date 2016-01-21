
var helpers = (function() {
  var _helpers = {};

  // Determine if a date is between a start and end
  // date --> expects format of 'MM/DD'
  // range -> expects format of 'MM/DD-MM/DD'
  _helpers.isBetween = function(date, range) {
    var month_num = range.split("-")[0].split("/")[0],
        final_day = range.split("-")[1].split("/")[1];

    return date.split("/")[0] == month_num && date.split("/")[1] <= final_day;
  };

  // Make and return a moment object from a time
  // time --> expects format of 'h:mm am/pm'
  _helpers.makeMoment = function(time) {
    return moment(moment().format("YYYY-MM-DD") + " " + time);
  };

  // Find info for next prayer based on today's iqama times and current time 
  // [returns fajr if current time is after isha]
  // iqama_times -> hash of iqama times for today
  // pray_times --> hash of prayer times for today
  // m_i_time ----> Maghrib's iqama time (since it depends on athan time)
  _helpers.nextPrayerInfo = function(iqama_times, pray_times, m_i_time) {
    var now      = moment(),
        info = {};

    iqama_times['maghrib'] = m_i_time.split(" ")[0];

    for(var prayer in iqama_times) {
      prayer == 'fajr' ? iqama_times[prayer] += " am" : iqama_times[prayer] += " pm";
    }

    for(var prayer in iqama_times) {
      var iqama_moment = this.makeMoment(iqama_times[prayer]),
          pray_moment  = this.makeMoment(pray_times[prayer]);

      if (now.diff(iqama_moment) < 0) {
        info['prayer'] = prayer[0].toUpperCase() + prayer.slice(1);
        info['arabic'] = this.toArabic(prayer);
        info['iqama'] = now.to(iqama_moment);
        info['athan'] = now.to(pray_moment);
        break;
      }
    }

    if(!info['prayer']) {
      info['prayer'] = 'Fajr';
      info['arabic'] = this.toArabic('fajr');
      info['iqama']  = now.to(this.makeMoment(iqama_times['fajr']).add(1, 'd'));
      info['athan']  = now.to(this.makeMoment(pray_times['fajr']).add(1, 'd'));
    }

    return info;
  };

  // Finds the correct iqama date range based on today's date
  // data --> JSON file with all iqama date ranges
  _helpers.getIqamaRange = function(data) {
    var today = moment().format("MM/DD"),
          key = "";

      for(var range in data['iqamas']) {          
        if (helpers.isBetween(today, range)) {
          key = range;
          break;
        }
      }

    return data['iqamas'][range];
  };

  // Async fetches the iqamas JSON file
  _helpers.asyncIqamas = function() {
    return $.ajax({
          url: 'data/iqamas.json',
          dataType: "json"
        });
  };

  // Async call to fetch filenames from announcments folder
  _helpers.asyncAnnouncements = function() {
    return $.ajax({
      url: 'imgs/slides/'
    });
  }

  // Returns the arabic word for the given prayer
  // prayer --> english word, non-capitalized
  _helpers.toArabic = function(prayer) {
    var arabics = {'fajr': 'الفجر', 'dhuhr': 'الظهر', 'asr': 'العصر', 'maghrib': 'المغرب', 'isha': 'العشاء' };

    return arabics[prayer];
  }

  return _helpers;
})(); 
