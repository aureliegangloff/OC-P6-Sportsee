import { Link, Navigate } from "react-router";
import { useContext } from "react";

import UserCard from "../../components/UserCard/UserCard.jsx";
import KmCard from "../../components/KmCard/KmCard.jsx";
import styles from "./Dashboard.module.css";
import BpmCard from "../../components/BpmCard/BpmCard.jsx";
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
  const dateLastActivity = new Date(activityUser[nbActivities].date);

  function getLastMonday(date) {
    // getDay() renvoie : 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
    const dayOfTheWeek = date.getDay();

    // Si c'est dimanche (0), on doit reculer de 6 jours.
    // Sinon, on recule de (jourSemaine - 1) jours.
    const daysToSubtract = dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1;

    // Modifier la date en soustrayant les jours
    date.setDate(date.getDate() - daysToSubtract);

    return date;
  }

  function getNextSunday(date) {
    const dayOfTheWeek = date.getDay();
    // Si c'est dimanche (0), on avance de 7 jours (ou 0 si vous voulez le jour même)
    // Sinon, on fait (7 - jourSemaine) pour atteindre le dimanche
    const daysToAdd = dayOfTheWeek === 0 ? 0 : 7 - dayOfTheWeek;
    date.setDate(date.getDate() + daysToAdd);

    return date;
  }

  const lastMonday = getLastMonday(new Date(dateLastActivity));
  const nextSunday = getNextSunday(new Date(dateLastActivity));

  const startWeekDate = new Date(lastMonday).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const endWeekDate = new Date(nextSunday).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard">
      <UserCard />

      <section className={styles.performancesSection}>
        <h2>Vos dernières performances</h2>
        <div>
          <div className="card">
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
        <div></div>
      </section>
    </div>
  );
}

export default DashboardPage;
