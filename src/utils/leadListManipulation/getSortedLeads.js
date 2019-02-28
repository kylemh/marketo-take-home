/**
 * @description Takes leads and sorts them where most recent leads appear first and - if tied - remain in insertion order.
 *
 * @see https://lodash.com/docs/#orderBy
 * @param {[Object.<string, any>]} leads
 * @returns {[Object.<string, any>]} sorted leads
 */
function getSortedLeads(leads) {
  // If stable sort is an issue, we can use Lodash's orderBy
  // see: https://stackoverflow.com/questions/3026281/what-is-the-stability-of-the-array-sort-method-in-different-browsers
  // for concern
  return [...leads].sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));
}

export default getSortedLeads;
