import orderBy from 'lodash/orderBy';

/**
 * @function getBestLead
 * @throws when not passed an array
 *
 * @param {[Object.<string, any>]} leads
 * @returns {Object.<string, any>} the most recent, highest-indexed lead
 */
function getBestLead(leads) {
  if (leads.length <= 0) {
    throw new Error('must pass an array of leads to this function');
  }

  // Choose lead with most recent entry date and - if needed - lowest index
  const sortedLeads = orderBy(leads, ({ entryDate }) => new Date(entryDate).getTime(), 'desc');

  return sortedLeads[0];
}

export default getBestLead;
