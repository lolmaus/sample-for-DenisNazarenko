import Component from '@ember/component';
import { observer } from '@ember/object';

import moment from 'moment';
import Plotly from 'plotly';

import computed from 'ember-macro-helpers/computed'



export default Component.extend({

  startDate: null,
  endDate: null,

  data: computed('startDate', 'endDate', (startDate, endDate) => {
    if (!startDate || !endDate) return

    const startDateMoment = moment(startDate)
    const endDateMoment   = moment(endDate)
    const daysCount       = endDateMoment.diff(startDateMoment, 'days') + 1

    const dummyArray = Array(daysCount).fill(null)

    const x = dummyArray.map((_, i) => startDateMoment.clone().add(i, 'days').toDate())
    const y = dummyArray.map(() => Math.random())

    return [
      {
        x,
        y,
        type: 'bar',
      }
    ]
  }),

  _drawChart () {
    const data = this.get('data');
    Plotly.newPlot(this.element, data);
  },

  didInsertElement() {
    this._drawChart()
  },

  updateChartOnDateChange: observer('startDate', 'endDate', function () {
    this._drawChart()
  }),
});
