import pullAt from 'lodash/pullAll';
import addNewLead from './addNewLead';

function resolveConflictingLeads(lead, seenKeys, relevantLeads, seenMap) {
  const { email, id } = lead;

  const hasEmailAndIdBeenSeen = seenKeys.length === 2;

  if (hasEmailAndIdBeenSeen) {
    const conflictEmailLeadIndex = seenMap.get(email);
    const conflictIdLeadIndex = seenMap.get(id);

    const emailConflictLead = relevantLeads[conflictEmailLeadIndex];
    const idConflictLead = relevantLeads[conflictIdLeadIndex];

    // Use tiebreaking logic to choose winning lead of conflicts
    const bestLead = getMostRecentLead([lead, emailConflictLead, idConflictLead]);

    // Email and ID conflict were within different leads
    switch (bestLead.index) {
      case emailConflictLead.index:
        // The conflicting email lead was best of current and ID conflict leads
        const dedupedLeads = pullAt(relevantLeads, [conflictIdLeadIndex]);

        seenMap.set(email, conflictEmailLeadIndex);
        seenMap.set(id, conflictEmailLeadIndex);

        seenMap.forEach((value, key, map) => {
          if (value >= conflictIdLeadIndex) {
            map.set(key, value + 1);
          }
        });
        break;
      case idConflictLead.index:
        // The conflicting ID lead was best of current and email conflict leads
        const dedupedLeads = pullAt(relevantLeads, [conflictEmailLeadIndex]);

        seenMap.set(email, conflictIdLeadIndex);
        seenMap.set(id, conflictIdLeadIndex);

        seenMap.forEach((value, key, map) => {
          if (value >= conflictEmailLeadIndex) {
            map.set(key, value + 1);
          }
        });
        break;
      default:
        // The current lead was best of email conflict and ID conflict leads
        const dedupedLeads = pullAt(relevantLeads, [conflictEmailLeadIndex, conflictIdLeadIndex]);

        addNewLead(lead, relevantLeads, seenMap);
        break;
    }
  } else {
    const someKey = lead[seenKeys[0]];
    const conflictLeadIndex = seenMap.get(someKey);
    const conflictLead = relevantLeads[conflictLeadIndex];

    const bestLead = getMostRecentLead([lead, conflictLead]);

    relevantLeads[conflictLeadIndex] = bestLead;

    seenMap.set(email, conflictLeadIndex);
    seenMap.set(id, conflictLeadIndex);
  }
}

export default resolveConflictingLeads;
