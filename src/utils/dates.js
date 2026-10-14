export function getLastMonday(date) {
  const result = new Date(date);
  // getDay() renvoie : 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
  const dayOfTheWeek = result.getDay();

  // Si c'est dimanche (0), on doit reculer de 6 jours.
  // Sinon, on recule de (jourSemaine - 1) jours.
  const daysToSubtract = dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1;

  // Modifier la date en soustrayant les jours
  result.setDate(result.getDate() - daysToSubtract);

  return result;
}

export function getNextSunday(date) {
  const result = new Date(date);
  const dayOfTheWeek = result.getDay();
  // Si c'est dimanche (0), on avance de 7 jours (ou 0 si vous voulez le jour même)
  // Sinon, on fait (7 - jourSemaine) pour atteindre le dimanche
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
