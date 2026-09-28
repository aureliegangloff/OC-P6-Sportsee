import { Link, Navigate, useParams } from "react-router";
import { useContext } from "react";

import { users } from "../../data/users";
import ProfileCard from "../../components/ProfileCard";
import KmCard from "../../components/KmCard/KmCard.jsx";
import styles from "./Dashboard.module.css";
import BpmCard from "../../components/BpmCard/BpmCard.jsx";
import { AuthContext } from "../../utils/context";

function DashboardPage() {
  const { userId } = useParams();
  const { token } = useContext(AuthContext);
  const user = users.find((item) => item.id === userId);

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

  const startWeekDate = new Date("2026-09-26").toString();
  const endWeekDate = new Date().toString();

  return (
    <div className="dashboard">
      <ProfileCard />

      <section className={styles.performancesSection}>
        <h2>Vos dernières performances</h2>
        <div>
          <div className="card">
            <KmCard />
          </div>
          <div className="card">
            <BpmCard />
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
