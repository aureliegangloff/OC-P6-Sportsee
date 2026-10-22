import styles from "./Dashboard.module.css";
import { Link, Navigate } from "react-router";
import { useContext } from "react";
import {
  getLastMonday,
  getNextSunday,
  toLocalDateString,
} from "../../utils/dates";

import UserCard from "../../components/UserCard/UserCard.jsx";
import KmCard from "../../components/KmCard/KmCard.jsx";
import BpmCard from "../../components/BpmCard/BpmCard.jsx";
import GoalCard from "../../components/GoalCard/GoalCard.jsx";

import AuthContext from "../../utils/context/AuthContext";
import { useUserActivity } from "../../utils/Hooks/useUserActivity.js";

function DashboardPage() {
  const { token, user, loading: authLoading } = useContext(AuthContext);

  const today = new Date();
  const lastMonday = getLastMonday(today);
  const nextSunday = getNextSunday(today);

  const startWeek = toLocalDateString(lastMonday);
  const endWeek = toLocalDateString(nextSunday);

  // Get the activities for the week
  const {
    data: activities,
    loading: activitiesLoading,
    error: weeklyError,
  } = useUserActivity(startWeek, endWeek);
  const weeklyActivities = activities;

  if (authLoading) {
    return <p role="status">Chargement du tableau de bord...</p>;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return (
      <div className="dashboard">
        <h1>Utilisateur introuvable</h1>
        <Link to="/">Retour à l'accueil</Link>
      </div>
    );
  }

  if (activitiesLoading) {
    return <p role="status">Chargement de vos activités...</p>;
  }

  const weeklyRaces = weeklyActivities.length;

  const activityDuration = weeklyActivities.reduce(
    (total, activity) => total + activity.duration,
    0,
  );
  const distance = weeklyActivities.reduce(
    (total, activity) => total + activity.distance,
    0,
  );

  // Display the dates in the "This week" section
  const startWeekDate = lastMonday.toLocaleDateString("fr-FR");
  const endWeekDate = nextSunday.toLocaleDateString("fr-FR");

  return (
    <div className="dashboard">
      {weeklyError && <p role="alert">Erreur : {weeklyError.message}</p>}

      <UserCard distance={true} />

      <section className={styles.performancesSection}>
        <h2>Vos dernières performances</h2>
        <div>
          <div className="card short-card">
            <KmCard />
          </div>
          <div className="card">
            <BpmCard startWeekDate={lastMonday} endWeekDate={nextSunday} />
          </div>
        </div>
      </section>

      <section className={styles.weekSection}>
        <h2>Cette semaine</h2>
        <p>
          Du {startWeekDate} au {endWeekDate}
        </p>
        <div>
          <div className="card short-card">
            <GoalCard weeklyRaces={weeklyRaces} />
          </div>
          <div className={styles.colLeft}>
            <div className="card">
              <p>Durée d'activité</p>
              <div className={styles.activityDuration}>
                <span>{activityDuration}</span> minutes
              </div>
            </div>
            <div className="card">
              <p>Distance</p>
              <div className={styles.distance}>
                <span>{distance}</span> kilomètres
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
