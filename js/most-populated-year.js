const util = require("util");

let input = [
  [1975, 5],
  [1978, 6],
  [1980, 2],
];

function mostPopulatedYear(data) {
  let yearPopulation = {};
  for (const person of data) {
    let birthyear = person[0];
    let years = person[1];
    for (let i = birthyear; i < birthyear + years; i++) {
      yearPopulation[i] = (yearPopulation[i] || 0) + 1;
    }
  }
  const sortedPopulation = Object.entries(yearPopulation).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedPopulation[0][0];
}

console.log(util.inspect(mostPopulatedYear(input), { depth: null }));
