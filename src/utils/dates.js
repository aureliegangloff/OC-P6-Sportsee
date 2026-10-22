export function getLastMonday(date) {
  const result = new Date(date);
  // getDay() returns: 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const dayOfTheWeek = result.getDay();

  // If it's Sunday (0), go back 6 days.
  // Otherwise, go back (dayOfTheWeek - 1) days.
  const daysToSubtract = dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1;

  // Update the date by subtracting the days
  result.setDate(result.getDate() - daysToSubtract);

  return result;
}

export function getNextSunday(date) {
  const result = new Date(date);
  const dayOfTheWeek = result.getDay();
  // If it's Sunday (0), move forward 7 days (or 0 to keep the same day).
  // Otherwise, add (7 - dayOfTheWeek) to reach Sunday.
  const daysToAdd = dayOfTheWeek === 0 ? 0 : 7 - dayOfTheWeek;
  result.setDate(result.getDate() + daysToAdd);

  return result;
}

export function toLocalDateString(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}
