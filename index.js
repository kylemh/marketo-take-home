import fs from 'fs';
import { leads } from './inputs/leads.json';
import addLeadToList from './utils/addLeadToList';
import sortLeadsByEntryDate from './utils/sortLeadsByEntryDate';

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

// Deduped Leads Output
const dedupedLeadsJSON = JSON.stringify({ leads: dedupedLeads }, null, 2);
fs.writeFileSync(`./outputs/deduped_leads.json`, dedupedLeadsJSON);

// Loggin Output
const removedLeadIndeces = Array.from(dupeLeadIndeces).sort();
const removedLeads = removedLeadIndeces.map((index) => leads[index]);
const now = new Date().getTime();
fs.writeFileSync(
  `./outputs/logs/deduped_leads@${now}.txt`,
  `Removed Leads:\n${removedLeads.map((lead) =>
    JSON.stringify(lead, null, 2),
  )}\n\nDeduped Leads:\n${dedupedLeads.map((lead) => JSON.stringify(lead, null, 2))}\n
`,
);
