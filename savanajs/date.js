'use strict';

function DateClass() {

  this.timestamp = function () {

    return new Date().getTime();
  };

  this.daysDifferenceBetweenDates = function (date_start, date_end) {

    if (!date_start || !date_end) return;

    if (date_start.getTime() <= date_end.getTime()) {

      var dif = Date.UTC(date_start.getYear(), date_start.getMonth(), date_start.getDate(), 0, 0, 0) - Date.UTC(date_end.getYear(), date_end.getMonth(), date_end.getDate(), 0, 0, 0);

      return Math.abs(dif / 1000 / 60 / 60 / 24);
    } else {

      return 0;
    }
  };
}

// Usando na função "require" do NODEJS
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = new DateClass();
}