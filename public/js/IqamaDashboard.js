(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('IqamaDashboard', ['module', 'prayer-times', 'moment-es6', 'jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('prayer-times'), require('moment-es6'), require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.prayerTimes, global.momentEs6, global.jquery);
    global.IqamaDashboard = mod.exports;
  }
})(this, function (module) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _interopDefault(ex) {
    return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
  }

  var prayerTimes = _interopDefault();
  var moment$1 = _interopDefault();
  var $$1 = _interopDefault();

  var IqamaDashboard = function () {
    function IqamaDashboard() {
      _classCallCheck(this, IqamaDashboard);
    }

    _createClass(IqamaDashboard, null, [{
      key: 'run',
      value: function run() {
        console.log('Hi');
        IqamaDashboard.secondlyUpdate();
      }
    }, {
      key: 'secondlyUpdate',
      value: function secondlyUpdate() {
        IqamaDashboard.updateClock();
        setTimeout(IqamaDashboard.secondlyUpdate, 1000);
      }
    }, {
      key: 'updateClock',
      value: function updateClock() {
        console.log(moment);
        var now = moment(),
            second = now.seconds() * 6,
            minute = now.minutes() * 6 + second / 60,
            hour = now.hours() % 12 / 12 * 360 + 90 + minute / 12;

        $$1('#hour').css('transform', 'rotate(' + hour + 'deg)');
        $$1('#minute').css('transform', 'rotate(' + minute + 'deg)');
        $$1('#second').css('transform', 'rotate(' + second + 'deg)');
      }
    }]);

    return IqamaDashboard;
  }();

  module.exports = IqamaDashboard;
});