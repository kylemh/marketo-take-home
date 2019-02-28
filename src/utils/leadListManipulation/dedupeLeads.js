import getSortedLeads from './getSortedLeads';

/**
 * @description Takes a list of leads and returns the list of deduped and removed leads
 *
 * @param {[Object.<string, any>]} leads
 * @returns {{ dedupedLeads: [Object.<string, any>], removedLeads: [Object.<string, any>] }}
 */
function dedupeLeads(leads) {
  const sortedLeads = getSortedLeads(leads);

  // Keep track of removed lead index positions for logging purposes
  const dupeLeadIndeces = new Set();

  // Keep track of seen emails and IDs to prevent adding dupes
  const seenSet = new Set();

  // The final product
  const dedupedLeads = [];

  // Add leads to deduped list if its email or ID have never been seen before
  sortedLeads.forEach((curLead) => {
    const { email, _id } = curLead;

    const hasSeenEmail = seenSet.has(email);
    const hasSeenId = seenSet.has(_id);

    if (hasSeenEmail || hasSeenId) {
      const originalInsertionIndexOfDupe = leads.findIndex((lead) => {
        return lead === curLead;
      });
      dupeLeadIndeces.add(originalInsertionIndexOfDupe);
    } else {
      seenSet.add(curLead.email);
      seenSet.add(curLead._id);

      dedupedLeads.push(curLead);
    }
  });

  const removedLeadIndeces = Array.from(dupeLeadIndeces).sort();
  const removedLeads = removedLeadIndeces.map((index) => leads[index]);

  return { dedupedLeads, removedLeads };
}

export default dedupeLeads;
