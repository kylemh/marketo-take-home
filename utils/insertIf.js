/**
 * @function insertIf
 * @description If first parameter is true, return every other argument as an array
 *
 * @see http://2ality.com/2017/04/conditional-literal-entries.html
 * @param {boolean} condition
 * @param {*} elements rest operator variable (symbolizes every parameter passed after `condition`)
 * @returns {[]} an empty or filled array
 */
function insertIf(condition, ...elements) {
  return condition ? elements : [];
}
