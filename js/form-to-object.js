const util = require("util");

/*
Given a form and a value in the format of two strings, 
i.e. "contact.phone.area" and "909"
Return an object

Input: "contact.phone.area", "909"
Output: { contact: { phone: { area: '909' } } }

*/

function setPathValue(formData, str, val) {
  // Step 1: Break up the string into arr of objects
  const arrObj = str.split(".");

  // Step 2: Create pointer that will point to each level
  let currentLevel = formData;

  for (let i = 0; i < arrObj.length; i++) {
    const name = arrObj[i];

    if (i === arrObj.length - 1) {
      currentLevel[name] = val; // If we reach end of arr simply set to value
    } else {
      currentLevel[name] = currentLevel[name] || {}; // Else set name for current level and initialize if it doesnt exist
      currentLevel = currentLevel[name]; // Pointer points to current level now
    }
  }

  // Use util.inspect to log the complete object
  console.log(util.inspect(formData, { depth: null }));
  return formData;
}

// function setPathValueRecursive(targetObj, keys, value) {
//     // 1. Base Case: If only one key remains, we've reached the final level.
//     if (keys.length === 1) {
//         const finalKey = keys[0];
//         targetObj[finalKey] = value;
//         return targetObj;
//     }

//     // 2. Recursive Step: Get the current key and the rest of the keys.
//     const currentKey = keys[0];
//     const remainingKeys = keys.slice(1); // Get all keys except the first one

//     // Ensure the nested object exists (crucial for merging multiple paths)
//     // If it exists, reuse it; otherwise, initialize it.
//     targetObj[currentKey] = targetObj[currentKey] || {};

//     // 3. Recursive Call: Call the function again for the remaining keys,
//     // drilling down into the newly established (or reused) nested object.
//     return setPathValueRecursive(targetObj[currentKey], remainingKeys, value);
// }

// // --- Wrapper Function for easier calling ---

// function formToObjectRecursive(strPath, value, targetObj = {}) {
//     const keys = strPath.split(".");
//     return setPathValueRecursive(targetObj, keys, value);
// }

let formData = {}; // Initialize the single object outside

// Call the function repeatedly to build the object
setPathValue(formData, "contact.phone.area", "909");
setPathValue(formData, "contact.phone.exchange", "555");
setPathValue(formData, "contact.email", "test@example.com");
setPathValue(formData, "personal.name.first", "John");
