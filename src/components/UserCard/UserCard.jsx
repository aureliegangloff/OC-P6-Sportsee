import styles from "./UserCard.module.css";
import pictoDistance from "../../assets/picto-distance.png";

import { useContext } from "react";
import AuthContext from "../../utils/context/AuthContext";

function UserCard({ distance = false }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="user-card-empty">Utilisateur introuvable.</div>;
  }

  const { firstName, lastName, profilePicture, createdAt } = user.profile;
  const { totalDistance } = user.statistics;
  const memberSince = new Date(createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={`${styles.userCard} ${distance ? "" : styles.bgwhite}`}>
      <div className={styles.leftUserCard}>
        <div className={styles.wrapperPicture}>
          <img src={profilePicture} width="104" height="117" />
        </div>
        <div>
          <h1>
            {firstName} {lastName}
          </h1>
          <p>Membre depuis le {memberSince}</p>
        </div>
      </div>
      {distance && (
        <div className={styles.rightUserCard}>
          <p>Distance totale parcourue</p>
          <div className={styles.distance}>
            <span>
              <img src={pictoDistance} alt="" width="34" height="34" />
              {totalDistance} km
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserCard;
