import styles from "./Profile.module.css";
import { useContext } from "react";
import { Navigate } from "react-router";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserCard from "../../components/UserCard/UserCard";

import AuthContext from "../../utils/context/AuthContext";
import StatsCard from "../../components/StatsCard/StatsCard";

function ProfilePage() {
  const { token, user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <p role="alert">Impossible de charger le profil utilisateur.</p>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.col}>
        <UserCard />
        <ProfileCard />
      </div>
      <div className={styles.col}>
        <StatsCard />
      </div>
    </div>
  );
}

export default ProfilePage;
