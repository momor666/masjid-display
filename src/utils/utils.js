import moment from 'moment-es6'

/**
 * @module helpers
 * All the helper functions needed in this project
 */
export default {
  /**
   * Returns a new string in which all leading and trailing occurrences of a set
   * of specified characters from the current String object are removed.
   * @param  { String } string - source string
   * @returns { String } - cleaned string
   */
  trim: function(string) {
    return string.replace(/^\s+|\s+$/gm, '')
  },

  // Determine if a date is between a start and end
  // date --> expects format of 'MM/DD'
  // range -> expects format of 'MM/DD-MM/DD'
  isBetween: function(date, range) {
    let monthNum = range.split('-')[0].split('/')[0],
      finalDay = range.split('-')[1].split('/')[1]

    return date.split('/')[0] == monthNum && date.split('/')[1] <= finalDay
  },

  // Make and return a moment object from a time
  // time --> expects format of 'h:mm am/pm'
  makeMoment: function(time) {
    let formattedTime = moment().format('YYYY-MM-DD') + ' ' + time
    return moment(formattedTime, 'YYYY-MM-DD h:mm a')
  },

  // Find info for next prayer based on today's iqama times and current time
  // [returns fajr if current time is after isha]
  // iqamaTimes -> hash of iqama times for today
  // prayerTimes --> hash of prayer times for today
  // maghribIqamaTime ----> Maghrib's iqama time (since it depends on athan)
  nextPrayerInfo: function(iqamaTimes, prayerTimes, maghribIqamaTime) {
    let now  = moment()
    let info = {}

    iqamaTimes.maghrib = maghribIqamaTime.split(' ')[0]

    for (let p in iqamaTimes) {
      p == 'fajr' ? iqamaTimes[p] += ' am' : iqamaTimes[p] += ' pm'
    }

    for (let prayer in iqamaTimes) {
      let iqamaMoment = this.makeMoment(iqamaTimes[prayer]),
        prayerMoment  = this.makeMoment(prayerTimes[prayer])

      if (now.diff(iqamaMoment) < 0) {
        info.prayer = prayer[0].toUpperCase() + prayer.slice(1)
        info.arabic = this.toArabic(prayer)
        info.iqama = now.to(iqamaMoment)
        info.athan = now.to(prayerMoment)
        break
      }
    }

    if (!info.prayer) {
      info.prayer = 'Fajr'
      info.arabic = this.toArabic('fajr')
      info.iqama  = now.to(this.makeMoment(iqamaTimes.fajr).add(1, 'd'))
      info.athan  = now.to(this.makeMoment(prayerTimes.fajr).add(1, 'd'))
    }

    return info
  },

  // Finds the correct iqama date range based on today's date
  // data --> JSON file with all iqama date ranges
  getIqamaRange: function(data) {
    let today = moment().format('MM/DD'),
      key = ''

    for (let range in data.iqamas) {
      if (helpers.isBetween(today, range)) {
        key = range
        break
      }
    }

    return data.iqamas[range]
  },

  // Async fetches the iqamas JSON file
  asyncIqamas: function() {
    return $.ajax({
      url: 'data/iqamas.json',
      dataType: 'json'
    })
  },

  // Async call to fetch filenames from announcments folder
  asyncAnnouncements: function() {
    return $.ajax({
      url: 'slides'
    })
  },

  // Async call to fetch config details
  asyncConfig: function() {
    return $.ajax({
      url: 'config-detail'
    })
  },

  // Async call to fetch iqama times
  asyncIqama: function() {
    return $.ajax({
      url: 'iqamas'
    })
  },

  // Async call to update iqama ranges
  asyncUpdateIqamas: function(data) {
    return $.ajax({
      url: '/iqama-update',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    })
  },

  // Returns the arabic word for the given prayer
  // prayer --> english word, non-capitalized
  toArabic: function(prayer) {
    let arabics = {
      'fajr': 'الفجر',
      'dhuhr': 'الظهر',
      'asr': 'العصر',
      'maghrib': 'المغرب',
      'isha': 'العشاء'
    }

    return arabics[prayer]
  },

  // Display an alert of the type given with the intended message
  // Uses the generic Bootstrap types [success, danger, warning, etc]
  alert: function(type, message) {
    $('#alert').html(
      `<div class="alert alert-${type} alert-dismissable">
        <button type="button"
                class="close"
                data-dismiss="alert"
                aria-hidden="true">
          &times;
        </button>
        <span>${message}</span>
      </div>`
    )
  },

  // Return a HTML object that represents one row of an iqama range
  iqama_row: function(start, end, times) {
    return $(
      `<tr id="${[start, end].join('-')}">
        <td>${start}</td>
        <td>${end}</td>
        <td>${times.fajr}</td>
        <td>${times.dhuhr}</td>
        <td>${times.asr}</td>
        <td>${times.maghrib}</td>
        <td>${times.isha}</td>
        <td>
         <div class="btn-group" role="group">
          <button type="button" class="btn btn-default">
           <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
         </div>
        </td>
       </tr>`
    )
  }
}
