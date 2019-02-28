import orderBy from 'lodash/orderBy';

/**
 * @description Takes leads and sorts them where most recent leads appear first and - if tied - remain in insertion order.
 *
 * @param {[Object.<string, any>]} leads
 * @returns {[Object.<string, any>]} sorted leads
 */
function sortLeadsByEntryDate(leads) {
  return orderBy(leads, ({ entryDate }) => new Date(entryDate).getTime(), 'desc');
}

export default sortLeadsByEntryDate;
