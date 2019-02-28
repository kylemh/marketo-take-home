/**
 * @description Takes leads and sorts them where most recent leads appear first and - if tied - remain in insertion order.
 *
 * @see https://lodash.com/docs/#orderBy
 * @param {[Object.<string, any>]} leads
 * @returns {[Object.<string, any>]} sorted leads
 */
function getSortedLeads(leads) {
  return [...leads].sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));
}

export default getSortedLeads;
