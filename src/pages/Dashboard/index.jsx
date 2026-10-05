import { Link, Navigate } from "react-router";
import { useContext } from "react";
import { getLastMonday, getNextSunday } from "../../utils/dates";

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

  const lastMonday = getLastMonday(new Date(dateLastActivity));
  const nextSunday = getNextSunday(new Date(dateLastActivity));

  const startWeekDate = new Date(lastMonday).toLocaleDateString("fr-FR");
  const endWeekDate = new Date(nextSunday).toLocaleDateString("fr-FR");

  // Calculate dates for last 4 weeks
  const makeWeek = (offset) => {
    const start = new Date(lastMonday);
    const end = new Date(nextSunday);

    start.setDate(start.getDate() + offset);
    end.setDate(end.getDate() + offset);

    return { start, end };
  };

  const S1 = makeWeek(-21);
  const S2 = makeWeek(-14);
  const S3 = makeWeek(-7);
  const S4 = makeWeek(0);

  // const data = [
  //   { start: S1.start.toLocaleDateString(), end: S1.end.toLocaleDateString() },
  //   { start: S2.start.toLocaleDateString(), end: S2.end.toLocaleDateString() },
  //   { start: S3.start.toLocaleDateString(), end: S3.end.toLocaleDateString() },
  //   { start: S4.start.toLocaleDateString(), end: S4.end.toLocaleDateString() },
  // ];
  // console.log("data", data);

  return (
    <div className="dashboard">
      <UserCard distance={true} />

      <section className={styles.performancesSection}>
        <h2>Vos dernières performances</h2>
        <div>
          <div className="card">
            <KmCard S1={S1} S2={S2} S3={S3} S4={S4} />
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
