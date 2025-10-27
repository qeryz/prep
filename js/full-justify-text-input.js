const util = require("util");

/* The `fullJustify` function in the provided JavaScript code is a function that takes an array of
words and a maximum width as input parameters. It then performs full justification on the words to
create lines of text that are aligned both left and right within the specified maximum width. */
var fullJustify = function (words, maxWidth) {
  const result = [];
  let i = 0;
  const n = words.length;

  while (i < n) {
    // Find how many words can fit in current line
    let j = i;
    let currentLength = 0;

    // Try to add words until we exceed maxWidth
    while (j < n && currentLength + words[j].length + (j - i) <= maxWidth) {
      currentLength += words[j].length;
      j++;
    }

    // Calculate spaces needed
    const numWords = j - i;
    const totalSpaces = maxWidth - currentLength;

    // Build the line
    let line = "";

    if (j === n || numWords === 1) {
      // Last line or single word line - left justified
      for (let k = i; k < j; k++) {
        line += words[k];
        if (k < j - 1) {
          line += " ";
        }
      }
      // Add remaining spaces at the end
      line += " ".repeat(maxWidth - line.length);
    } else {
      // Regular line - distribute spaces evenly
      const spacesBetween = Math.floor(totalSpaces / (numWords - 1));
      const extraSpaces = totalSpaces % (numWords - 1);

      for (let k = i; k < j; k++) {
        line += words[k];

        if (k < j - 1) {
          // Add base spaces
          line += " ".repeat(spacesBetween);

          // Add extra spaces for left slots
          if (k - i < extraSpaces) {
            line += " ";
          }
        }
      }
    }

    result.push(line);
    i = j;
  }

  return result;
};

const words = ["This", "is", "an", "example", "of", "text", "justi", "a", "b"];
const maxWidth = 16;
console.log(fullJustify(words, maxWidth));
