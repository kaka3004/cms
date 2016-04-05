export function isDevEnv() {
  return process.env.NODE_ENV === 'development';
}

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
export function merge(obj1, obj2): any {
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}

export function slugify(text) {
  return text && text.toString().toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

/**
 * Get id from mongoose relation
 * @param {Object|string} object Mongoose document or id
 */
export function getDocumentId(object): string {
  return (object instanceof Object) && object._id ? String(object._id) : String(object); 
}

export function checkEqualIds(doc1, doc2) {
  return getDocumentId(doc1) === getDocumentId(doc2);
}