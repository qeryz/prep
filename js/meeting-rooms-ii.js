let input = [
  [1, 5],
  [2, 6],
  [3, 7],
];

const minRoomsNeededForMeetings = (meetings) => {
  // Stores the event points (start: +1, end: -1)
  let eventMap = {};

  for (const [start, end] of meetings) {
    eventMap[start] = (eventMap[start] || 0) + 1;
    eventMap[end] = (eventMap[end] || 0) - 1;
  }

  // Sorts all unique event times to define the sweep line path
  const orderedTimes = Object.keys(eventMap).sort((a, b) => a - b);

  let maxRoomsNeeded = 0; // The result (maximum concurrency found)
  let currentConcurrency = 0; // The running count of simultaneous meetings

  for (const time of orderedTimes) {
    let concurrencyChange = eventMap[time];

    // Update the running count as the sweep line moves past this time
    currentConcurrency += concurrencyChange;

    // Update the maximum rooms required so far
    if (currentConcurrency > maxRoomsNeeded) {
      maxRoomsNeeded = currentConcurrency;
    }
  }
  return maxRoomsNeeded;
};

console.log(minRoomsNeededForMeetings(input));
