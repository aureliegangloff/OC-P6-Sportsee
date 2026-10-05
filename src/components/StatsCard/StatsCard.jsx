import styles from "./StatsCard.module.css";
import { useContext } from "react";
import AuthContext from "../../utils/context/AuthContext";

function StatsCard() {
  const { user, activityUser } = useContext(AuthContext);

  if (!user) {
    return <div className="stats-card-empty">Utilisateur introuvable.</div>;
  }
  const memberSince = new Date(user.profile.createdAt).toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  const totalDuration = {
    heures: Math.floor(user.statistics.totalDuration / 60),
    minutes: user.statistics.totalDuration % 60,
  };

  const totalCalories = activityUser.reduce(
    (total, activity) => total + activity.caloriesBurned,
    0,
  );

  const restDays = (createdAt, activityUser) => {
    const startDate = new Date(createdAt);
    const endDate = new Date(
      activityUser.length
        ? activityUser[activityUser.length - 1].date
        : new Date(),
    );
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    const activeDays = activityUser.length;
    return totalDays - activeDays;
  };

  return (
    <div className={styles.statsCard}>
      <h2>Vos statistiques</h2>
      <p>depuis le {memberSince}</p>

      <div className={styles.gridStatsCard}>
        <div className={styles.statCard}>
          <p>Temps total couru</p>
          <span>{totalDuration.heures}h </span>
          {totalDuration.minutes}min
        </div>
        <div className={styles.statCard}>
          <p>Calories brûlées</p>
          <span>{totalCalories}</span> kcal
        </div>
        <div className={styles.statCard}>
          <p>Distance totale parcourue</p>
          <span>{user.statistics.totalDistance}</span> km
        </div>
        <div className={styles.statCard}>
          <p>Nombre de jours de repos</p>
          <span>{restDays(user.profile.createdAt, activityUser)}</span> jours
        </div>
        <div className={styles.statCard}>
          <p>Nombre de sessions</p>
          <span>{user.statistics.totalSessions}</span> sessions
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
