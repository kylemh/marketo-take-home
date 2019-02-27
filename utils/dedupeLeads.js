import addNewLead from './addNewLead';
import getMostRecentLead from './getMostRecentLead';
import insertIf from './insertIf';

function dedupeLeads(leads, dupeLeadIndecesSet) {
  // Want to keep track of initial entry order for entryDate tie breakers and for a unique ID to compare leads against
  const leadsWithIndexAsProperty = leads.map((lead, index) => {
    return { ...lead, index };
  });

  // Eventual answer list
  const finalLeads = [];

  // Track best guess positions as we iterate so that we can remove them easily if they're deduped later
  const leadIndexAssociationMap = new Map();

  leadsWithIndexAsProperty.forEach((lead) => {
    const { _id: id, email } = lead;

    const hasSeenEmail = leadIndexAssociationMap.has(email);
    const hasSeenId = leadIndexAssociationMap.has(id);

    if (!hasSeenEmail && !hasSeenId) {
      console.log(`\nWe've seen neither ${email} nor ${id} - add it!`);
      addNewLead(lead, finalLeads, leadIndexAssociationMap);
      return;
    } else {
      resolveConflictingLeads(
        lead,
        [...insertIf(hasSeenEmail, 'email'), ...insertIf(hasSeenId, 'id')],
        finalLeads,
        leadIndexAssociationMap,
      );
    }

    if (hasSeenEmail && !hasSeenId) {
      resolveConflictingLeads(lead, ['email'], finalLeads, leadIndexAssociationMap);
      //
      const conflictEmailLeadIndex = leadIndexAssociationMap.get(email);
      const emailConflictLead = finalLeads[conflictEmailLeadIndex];
      console.log(`\n${lead.index} has an issue...`);
      console.log(`We've seen ${email} before. It's at index: ${emailConflictLead.index}`);

      const bestLead = getMostRecentLead([lead, emailConflictLead]);
      console.log(`${bestLead.index} wins!`);

      leadIndexAssociationMap.set(email, conflictEmailLeadIndex);
      finalLeads[conflictEmailLeadIndex] = bestLead;
      return;
    }

    if (hasSeenId && !hasSeenEmail) {
      const conflictIdLeadIndex = leadIndexAssociationMap.get(id);
      const idConflictLead = finalLeads[conflictIdLeadIndex];
      console.log(`\n${lead.index} has an issue...`);
      console.log(`We've seen ${id} before. It's at index: ${idConflictLead.index}`);

      const bestLead = getMostRecentLead([lead, idConflictLead]);
      console.log(`${bestLead.index} wins!`);

      leadIndexAssociationMap.set(id, conflictIdLeadIndex);
      finalLeads[conflictIdLeadIndex] = bestLead;
      return;
    }
  });
}

export default dedupeLeads;
