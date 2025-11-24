let input = [
  [10, 20],
  [15, 25],
  [0, 5],
];

/**
 * The function `canAttendAllMeetings` checks if a person can attend all meetings without overlapping
 * based on start and end times.
 * @param meetings - An array of meeting time intervals, where each interval is represented as an array
 * with two elements: the start time and end time of the meeting. For example, `[[9, 10], [10, 12],
 * [11, 13]]` represents three meetings with start and end times
 * @returns The function `canAttendAllMeetings` returns a boolean value - `true` if it is possible to
 * attend all meetings without overlapping, and `false` if there are any overlaps in the meetings.
 */
const canAttendAllMeetings = (meetings) => {
  let meetingsStartEnd = {};

  for (const [start, end] of meetings) {
    meetingsStartEnd[start] = (meetingsStartEnd[start] || 0) + 1;
    meetingsStartEnd[end] = (meetingsStartEnd[end] || 0) - 1;
  }

  // Sorts all unique event times to define the sweep line path
  const orderedTimes = Object.keys(eventMap).sort((a, b) => a - b);

  let currentOverlap = 0;

  for (const time of orderedTimes) {
    let change = meetingsStartEnd[time];

    // At a time point T where an End (-1) and a Start (+1) happen,
    // 'change' is 0, and 'currentOverlap' is unchanged, which is correct
    // because the room is immediately available.
    currentOverlap += change;

    // This means an overlap has definitely occurred.
    if (currentOverlap > 1) return false;
  }
  return true;
};

console.log(canAttendAllMeetings(input));
