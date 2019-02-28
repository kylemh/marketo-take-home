import addLeadToList from './addLeadToList';
import sortLeadsByEntryDate from './sortLeadsByEntryDate';

/**
 * @description Takes a list of leads and returns the list of deduped and removed leads
 *
 * @param {[Object.<string, any>]} leads
 * @returns {{ dedupedLeads: [Object.<string, any>], removedLeads: [Object.<string, any>] }}
 */
function dedupeLeads(leads) {
  // Want to keep track of initial entry order before sorting for entryDate to keep track of removed leads
  const leadsWithIndexAsProperty = leads.map((lead, index) => {
    return { ...lead, index };
  });

  const sortedLeads = sortLeadsByEntryDate(leadsWithIndexAsProperty);

  // Keep track of removed lead index positions for logging purposes
  const dupeLeadIndeces = new Set();

  // Keep track of seen emails and IDs to prevent adding dupes
  const seenSet = new Set();

  // The final product
  const dedupedLeads = [];

  // Add leads to deduped list if its email or ID have never been seen before
  sortedLeads.forEach((lead) => {
    const { email, _id } = lead;

    const hasSeenEmail = seenSet.has(email);
    const hasSeenId = seenSet.has(_id);

    if (hasSeenEmail || hasSeenId) {
      dupeLeadIndeces.add(lead.index);
    } else {
      addLeadToList(lead, dedupedLeads, seenSet);
    }
  });

  const removedLeadIndeces = Array.from(dupeLeadIndeces).sort();
  const removedLeads = removedLeadIndeces.map((index) => leads[index]);

  return { dedupedLeads, removedLeads };
}

export default dedupeLeads;
