import fs from 'fs';
import pullAt from 'lodash/pullAll';
import { leads } from './inputs/leads.json';
import { getBestLead } from './utils';

// Want to keep track of initial entry order for entryDate tie breakers and for a unique ID to compare leads against
const leadsWithIndexAsProperty = leads.map((lead, index) => {
  return { ...lead, index };
});

// Track best guess positions as we iterate so that we can remove them easily if they're deduped later
const leadIndexAssociationMap = new Map();

// Track indeces of removed leads for logging purposes
const dupeLeadIndeces = new Set();

// Eventual answer list
const finalLeads = [];

for (const curLead of leadsWithIndexAsProperty) {
  const { _id: id, email } = curLead;

  const hasSeenEmail = leadIndexAssociationMap.has(email);
  const hasSeenId = leadIndexAssociationMap.has(id);

  if (!hasSeenEmail && !hasSeenId) {
    console.log(`\nWe've seen neither ${email} nor ${id} - add it!`);
    leadIndexAssociationMap.set(email, finalLeads.length);
    leadIndexAssociationMap.set(id, finalLeads.length);

    finalLeads.push(curLead);
  } else if (hasSeenEmail && hasSeenId) {
    console.log(`\nWe've seen both ${email} and ${id}`);
    const conflictEmailLeadIndex = leadIndexAssociationMap.get(email);
    const conflictIdLeadIndex = leadIndexAssociationMap.get(id);

    const emailConflictLead = finalLeads[conflictEmailLeadIndex];
    const idConflictLead = finalLeads[conflictIdLeadIndex];

    // Use tiebreaking logic to choose winning lead of conflicts
    const bestLead = getBestLead([curLead, emailConflictLead, idConflictLead]);

    console.log(
      `\nEmail conflict is ${emailConflictLead.index}, and ID conflict is ${idConflictLead.index}`,
    );

    const [firstConflictIndex, lastConflictIndex] = [
      conflictEmailLeadIndex,
      conflictIdLeadIndex,
    ].sort();

    // Remove dupes, adjust answer accordingly, and edit seen email/id locations (indeces)
    if (firstConflictIndex === lastConflictIndex) {
      // Email and ID conflict were both located on the same lead
      leadIndexAssociationMap.set(email, firstConflictIndex);
      leadIndexAssociationMap.set(id, firstConflictIndex);
      finalLeads[firstConflictIndex] = bestLead;
    } else {
      switch (bestLead.index) {
        case emailConflictLead.index:
          pullAt(finalLeads, [conflictIdLeadIndex]);
          forEachRight(conflictIdLeadIndex, (val) => (val += 1));

          leadIndexAssociationMap.set(email, conflictEmailLeadIndex);
          leadIndexAssociationMap.set(id, conflictEmailLeadIndex);
          break;
        case idConflictLead.index:
          pullAt(finalLeads, [conflictEmailLeadIndex]);
          forEachRight(conflictEmailLeadIndex, (val) => (val += 1));

          leadIndexAssociationMap.set(email, conflictIdLeadIndex);
          leadIndexAssociationMap.set(id, conflictIdLeadIndex);
          break;
        default:
          // curLead === bestLead
          pullAt(finalLeads, [firstConflictIndex, lastConflictIndex]);
          forEachRight(firstConflictIndex, (val) => (val += 1));

          leadIndexAssociationMap.set(email, firstConflictIndex);
          leadIndexAssociationMap.set(id, firstConflictIndex);
          finalLeads[firstConflictIndex] = bestLead;
          break;
      }
    }
  } else {
    if (hasSeenEmail) {
      const conflictEmailLeadIndex = leadIndexAssociationMap.get(email);
      const emailConflictLead = finalLeads[conflictEmailLeadIndex];
      console.log(`\n${curLead.index} has an issue...`);
      console.log(`We've seen ${email} before. It's at index: ${emailConflictLead.index}`);

      const bestLead = getBestLead([curLead, emailConflictLead]);
      console.log(`${bestLead.index} wins!`);

      leadIndexAssociationMap.set(email, conflictEmailLeadIndex);
      finalLeads[conflictEmailLeadIndex] = bestLead;
    } else if (hasSeenId) {
      const conflictIdLeadIndex = leadIndexAssociationMap.get(id);
      const idConflictLead = finalLeads[conflictIdLeadIndex];
      console.log(`\n${curLead.index} has an issue...`);
      console.log(`We've seen ${id} before. It's at index: ${idConflictLead.index}`);

      const bestLead = getBestLead([curLead, idConflictLead]);
      console.log(`${bestLead.index} wins!`);

      leadIndexAssociationMap.set(id, conflictIdLeadIndex);
      finalLeads[conflictIdLeadIndex] = bestLead;
    }
  }
}

console.log('Dupe Lead Indeces:\n', dupeLeadIndeces, '\n\n');
console.log('Unique Leads:\n', finalLeads, '\n\n');

const jsonDedupedLeads = JSON.stringify({ leads: finalLeads }, null, 2).concat('\n');

fs.writeFileSync(`./outputs/deduped_leads.json`, jsonDedupedLeads);
