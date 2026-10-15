import styles from "./StatsCard.module.css";
import { useContext } from "react";
import AuthContext from "../../utils/context/AuthContext";
import { useUserActivity } from "../../utils/Hooks/useUserActivity.js";
import { toLocalDateString } from "../../utils/dates";

function StatsCard() {
  const { user } = useContext(AuthContext);

  const memberSince = new Date(user.profile.createdAt).toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
  const today = toLocalDateString(new Date());
  // get activities of the week
  const {
    data: activities,
    loading: loading,
    error: error,
  } = useUserActivity(memberSince, today);

  if (!user) {
    return <div className="stats-card-empty">Utilisateur introuvable.</div>;
  }
  const totalDuration = {
    heures: Math.floor(user.statistics.totalDuration / 60),
    minutes: user.statistics.totalDuration % 60,
  };

  const totalCalories = activities.reduce(
    (total, activity) => total + activity.caloriesBurned,
    0,
  );

  const restDays = (createdAt, activityUser) => {
    const startDate = new Date(createdAt);
    const endDate = new Date(
      activities.length ? activities[activities.length - 1].date : new Date(),
    );
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    const activeDays = activityUser.length;
    return totalDays - activeDays;
  };

  return (
    <div className={styles.statsCard}>
      {loading && <p>Chargement en cours...</p>}
      {error && <p>Erreur : {error}</p>}
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
          <span>{restDays(user.profile.createdAt, activities)}</span> jours
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
