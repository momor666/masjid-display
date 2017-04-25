import Clock from './components/Clock'
import PrayerTimes from 'prayer-times'
import utils from './utils/utils'
import 'moment-es6'
import $ from 'jquery'

let MAGHRIB_BUFFER = 10   // Number of minutes after athan for magrhib iqama


export default class IqamaDashboard {
  static run() {
    console.log('Hi')
    IqamaDashboard.secondlyUpdate()
  }

  static secondlyUpdate() {
    IqamaDashboard.updateClock()
    setTimeout(IqamaDashboard.secondlyUpdate, 1000)
  }

  static updateClock() {
    console.log(moment)
    let now = moment(),
      second = now.seconds() * 6,
      minute = now.minutes() * 6 + second / 60,
      hour = now.hours() % 12 / 12 * 360 + 90 + minute / 12

    $('#hour').css('transform', 'rotate(' + hour + 'deg)')
    $('#minute').css('transform', 'rotate(' + minute + 'deg)')
    $('#second').css('transform', 'rotate(' + second + 'deg)')
  }
}
