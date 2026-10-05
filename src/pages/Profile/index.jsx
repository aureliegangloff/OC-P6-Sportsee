import styles from "./Profile.module.css";
import { useContext } from "react";
import { Navigate } from "react-router";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserCard from "../../components/UserCard/UserCard";

import AuthContext from "../../utils/context/AuthContext";
import StatsCard from "../../components/StatsCard/StatsCard";

function ProfilePage() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" replace />;
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
