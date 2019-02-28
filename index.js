import fs from 'fs';
import { leads } from './inputs/leads.json';
import dedupeLeads from './utils/dedupeLeads';

const { dedupedLeads, removedLeads } = dedupeLeads(leads);

// Deduped Leads Output
const dedupedLeadsJSON = JSON.stringify({ leads: dedupedLeads }, null, 2);
fs.writeFileSync(`./outputs/deduped_leads.json`, dedupedLeadsJSON);

// Logging Output
const now = new Date().getTime();
fs.writeFileSync(
  `./outputs/logs/deduped_leads@${now}.txt`,
  `Removed Leads:\n${removedLeads.map((lead) =>
    JSON.stringify(lead, null, 2),
  )}\n\nDeduped Leads:\n${dedupedLeads.map((lead) => JSON.stringify(lead, null, 2))}\n
`,
);
