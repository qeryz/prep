const util = require("util");

/*
Given an array nums, return the most frequently occuring number

Input: nums = [2, 3, 5, 8, 3, 2, 2]
Output: 2
Explanation: The number 2 appears the most often in the array

*/

const nums = [2, 3, 5, 8, 3, 2, 2];

function findFreqVal(nums) {
  const freq = {};

  for (const val of nums) {
    freq[val] = (freq[val] || 0) + 1;
  }

  const sortedFreq = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  return sortedFreq[0][0];
}

console.log(findFreqVal(nums));
