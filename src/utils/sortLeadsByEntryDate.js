import orderBy from 'lodash/orderBy';

/**
 * @description Takes leads and sorts them where most recent leads appear first and - if tied - remain in insertion order.
 *
 * @see https://lodash.com/docs/#orderBy
 * @param {[Object.<string, any>]} leads
 * @returns {[Object.<string, any>]} sorted leads
 */
function sortLeadsByEntryDate(leads) {
  // orderBy is a safe sorting function meaning ties maintain insertion order
  return orderBy(leads, ({ entryDate }) => new Date(entryDate).getTime(), 'desc');
}

export default sortLeadsByEntryDate;
