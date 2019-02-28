import fs from 'fs';
import pick from 'lodash/pick';
import { leads } from './inputs/leads.json';
import addLead from './utils/addLead';
import sortLeadsByEntryDate from './utils/sortLeadsByEntryDate';

// Keep track of removed lead index positions for logging purposes
const dupeLeadIndeces = new Set();

// Want to keep track of initial entry order before sorting for entryDate to keep track of removed leads
const leadsWithIndexAsProperty = leads.map((lead, index) => {
  return { ...lead, index };
});

const sortedLeads = sortLeadsByEntryDate(leadsWithIndexAsProperty);

const seenSet = new Set();

const dedupedLeads = [];

sortedLeads.forEach((lead) => {
  const { email, _id } = lead;

  const hasSeenEmail = seenSet.has(email);
  const hasSeenId = seenSet.has(_id);

  if (hasSeenEmail || hasSeenId) {
    dupeLeadIndeces.add(lead.index);
    delete lead.index;
    return;
  } else {
    delete lead.index;
    addLead(lead, dedupedLeads, seenSet);
    return;
  }
});

const jsonDedupedLeads = JSON.stringify({ leads: dedupedLeads }, null, 2).concat('\n');

fs.writeFileSync(`./outputs/deduped_leads.json`, jsonDedupedLeads);
