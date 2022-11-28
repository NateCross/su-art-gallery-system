/**
 * Gets image from disk. Converts 'public' in path to
 * 'storage' and returns an object url
 * Also adds a leading slash so it properly routes from index
 * @param {string} path 
 * @return ObjectURL
 */
export function getImageFromDisk(path) {
  if (!path) return null;
  const replacedString = path.replace('public', '/storage');
  return replacedString;
}