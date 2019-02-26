import orderBy from 'lodash/orderBy';

/**
 * @function getBestLead
 * @throws when not passed an array
 *
 * @param {[Object.<string, any>]} leads
 * @returns {Object.<string, any>} the most recent, highest-indexed lead
 */
function getBestLead(leads) {
  try {
    if (leads.length <= 0) {
      throw 'Must pass an array of leads to this function';
    }

    // NOTE: lodash's orderBy is a stable sort that preserves entry order in the case of ties.
    const leadsSortedByEntryDate = orderBy(
      leads,
      ({ entryDate }) => new Date(entryDate).getTime(),
      'desc',
    );

    return leadsSortedByEntryDate[0];
  } catch (e) {
    throw new Error(e);
  }
}

export default getBestLead;
