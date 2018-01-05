import Component from '@ember/component';

import moment from 'moment';

import curriedComputed from 'ember-macro-helpers/curried-computed';
import raw from 'ember-macro-helpers/raw';

import {and, conditional, tag} from 'ember-awesome-macros';

const momentFormat = curriedComputed(date => moment(date).format('DD/MM/YY'));



export default Component.extend({
  startDate: null,
  endDate:   null,

  startDateFormatted: and('startDate', momentFormat('startDate')),
  endDateFormatted:   conditional('endDate', momentFormat('endDate'), raw('?')),

  formattedRange: and(
    'startDateFormatted',
    tag`${'startDateFormatted'} - ${'endDateFormatted'}`
  ),

  actions: {
    applyDate({date}) {
      const {start: startDate, end: endDate} = date
      this.setProperties({startDate, endDate})
    }
  }
});
