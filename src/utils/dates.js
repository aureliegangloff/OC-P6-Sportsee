export function getLastMonday(date) {
  // getDay() renvoie : 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
  const dayOfTheWeek = date.getDay();

  // Si c'est dimanche (0), on doit reculer de 6 jours.
  // Sinon, on recule de (jourSemaine - 1) jours.
  const daysToSubtract = dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1;

  // Modifier la date en soustrayant les jours
  date.setDate(date.getDate() - daysToSubtract);

  return date;
}

export function getNextSunday(date) {
  const dayOfTheWeek = date.getDay();
  // Si c'est dimanche (0), on avance de 7 jours (ou 0 si vous voulez le jour même)
  // Sinon, on fait (7 - jourSemaine) pour atteindre le dimanche
  const daysToAdd = dayOfTheWeek === 0 ? 0 : 7 - dayOfTheWeek;
  date.setDate(date.getDate() + daysToAdd);

  return date;
}
