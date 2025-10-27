const util = require("util");

const input = [
  "src/components/",
  "Readme.md",
  "src/assets/images/icon.png",
  "src/tests/tab.test.tsx",
];

/**
 * The function `createHierarchy` aims to organize a list of file paths into a hierarchical structure
 * based on their directory structure.
 * @param strArr - strArr is an array of strings representing file paths. The function createHierarchy
 * is intended to create a hierarchical object structure based on the file paths provided in the input
 * array.
 */
/*
input: 
[
  "src/components/",
  "Readme.md",
  "src/assets/images/icon.png",
  "src/tests/tab.test.tsx",
];
output: 
{
  src: {
    components: {},
    assets: { images: { 'icon.png': true } },
    tests: { 'tab.test.tsx': true }
  },
  'Readme.md': true
}
*/
function createHierarchy(paths) {
  const root = {};

  for (const path of paths) {
    // Reset path to root
    let currentPath = root;

    // Break string path into parts
    const parts = path.split("/").filter((str) => str !== "");
    for (const part of parts) {
      // Check if part is a file
      const isFile = part.includes(".");
      // If path including part doesn't exist, create
      // an object if its a folder, else set to true
      // if its a file
      if (!currentPath[part]) {
        currentPath[part] = isFile ? true : {};
      }
      // Finally, update current path to latest path
      currentPath = currentPath[part];
    }
  }
  return root;
}

console.log(util.inspect(createHierarchy(input), { depth: null }));
