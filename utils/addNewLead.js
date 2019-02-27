/**
 * @function addNewLead
 * @description Adds a lead to the end of a list of leads. Also adds lead's ID and Email to a Map of
 * seen IDs and Emails.
 *
 * @param {Object.<string, any>} lead The lead being added to the relevantLeads.
 * @param {[Object.<string, any>]} relevantLeads The list of added leads thus far.
 * @param {Map.<string, number>} seenMap The Map of seen ids and emails.
 * They're the keys and the value is their index in the relevantLeads list
 */
function addNewLead(lead, relevantLeads, seenMap) {
  seenMap.set(lead.email, relevantLeads.length);
  seenMap.set(lead.id, relevantLeads.length);

  relevantLeads.push(lead);
}
