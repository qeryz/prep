const util = require("util");

let input = [
  [1975, 5],
  [1978, 6],
  [1980, 2],
];

function mostPopulatedYear(data) {
  //   let yearPopulation = {};
  //   for (const person of data) {
  //     let birthyear = person[0];
  //     let years = person[1];
  //     for (let i = birthyear; i < birthyear + years; i++) {
  //       yearPopulation[i] = (yearPopulation[i] || 0) + 1;
  //     }
  //   }
  //   const sortedPopulation = Object.entries(yearPopulation).sort(
  //     (a, b) => b[1] - a[1]
  //   );

  //   return sortedPopulation[0][0];

  let yearsPopCounter = {};
  let maxPopulationYear;
  let maxPopulation = 0;

  for (const person of data) {
    let birthYear = person[0];
    let yearsAlive = person[1];
    let deathYear = birthYear + yearsAlive;

    // Add birth year to unique years list. Then, increment population counter for year
    yearsPopCounter[birthYear] = (yearsPopCounter[birthYear] || 0) + 1;

    // Add death year to unique years list. Then, decrement population counter for year
    yearsPopCounter[deathYear] = (yearsPopCounter[deathYear] || 0) - 1;
  }

  let uniqueYears = Object.keys(yearsPopCounter).sort((a, b) => a - b);

  let population = 0;
  for (const year of uniqueYears) {
    population += yearsPopCounter[year];
    if (population > maxPopulation) {
      maxPopulation = population;
      maxPopulationYear = year;
    }
  }
  return maxPopulationYear;
}

console.log(util.inspect(mostPopulatedYear(input), { depth: null }));
