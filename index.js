import fs from 'fs';
import { leads } from './inputs/leads.json';
import { dedupeLeads } from './utils';

const dupeLeadIndeces = new Set();

const jsonDedupedLeads = JSON.stringify(
  { leads: dedupeLeads(leads, dupeLeadIndeces) },
  null,
  2,
).concat('\n');

fs.writeFileSync(`./outputs/deduped_leads.json`, jsonDedupedLeads);
