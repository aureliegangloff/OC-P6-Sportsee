import { Link, Navigate } from "react-router";
import { useContext } from "react";
import { getLastMonday, getNextSunday } from "../../utils/dates";

import UserCard from "../../components/UserCard/UserCard.jsx";
import KmCard from "../../components/KmCard/KmCard.jsx";
import styles from "./Dashboard.module.css";
import BpmCard from "../../components/BpmCard/BpmCard.jsx";
import GoalCard from "../../components/GoalCard/GoalCard.jsx";

import AuthContext from "../../utils/context/AuthContext";

function DashboardPage() {
  const { token, user, activityUser } = useContext(AuthContext);

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

  const nbActivities = activityUser.length - 1;
  const dateLastActivity = activityUser[nbActivities].date;

  const lastMonday = getLastMonday(new Date(dateLastActivity));
  const nextSunday = getNextSunday(new Date(dateLastActivity));

  const startWeekDate = new Date(lastMonday).toLocaleDateString("fr-FR");
  const endWeekDate = new Date(nextSunday).toLocaleDateString("fr-FR");

  const weekActivities = activityUser.filter((activity) => {
    const activityDate = new Date(activity.date);
    return activityDate >= lastMonday && activityDate <= nextSunday;
  });
  const weeklyRaces = weekActivities.length;

  const activityDuration = weekActivities.reduce(
    (total, activity) => total + activity.duration,
    0,
  );
  const distance = weekActivities.reduce(
    (total, activity) => total + activity.distance,
    0,
  );

  return (
    <div className="dashboard">
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
