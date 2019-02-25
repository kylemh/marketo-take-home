const fs = require('fs');
const leads = require('./leads.json');

const dedupedLeads = leads;

const jsonDedupedLeads = JSON.stringify(dedupedLeads, null, 2).concat('\n');

fs.writeFileSync('deduped_leads.json', jsonDedupedLeads);
