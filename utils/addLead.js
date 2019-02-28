/**
 * @function addLead
 * @description Adds a lead to the end of a list of leads. Also adds lead's ID and Email to a Set of
 * seen IDs and Emails.
 *
 * @param {Object.<string, any>} lead The lead being added to the relevantLeads.
 * @param {[Object.<string, any>]} relevantLeads The list of added leads thus far.
 * @param {Set.<string, number>} seenSet The Set of seen ids and emails.
 * They're the keys and the value is their index in the relevantLeads list
 */
function addLead(lead, relevantLeads, seenSet) {
  delete lead.index;
  seenSet.add(lead.email);
  seenSet.add(lead._id);

  relevantLeads.push(lead);
}

export default addLead;
