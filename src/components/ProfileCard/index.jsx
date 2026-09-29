import styles from "./ProfileCard.module.css";
import { useParams } from "react-router";
import { users } from "../../data/users";
import pictoDistance from "../../assets/picto-distance.png";

function ProfileCard() {
  const { userId } = useParams();
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return <div className="profile-card-empty">Utilisateur introuvable.</div>;
  }

  const { firstName, lastName } = user.profile;
  const memberSince = new Date(user.profile.createdAt).toLocaleDateString(
    "fr-FR",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <div className={styles.profileCard}>
      <div className={styles.leftProfileCard}>
        <div className={styles.wrapperPicture}>
          <img src={user.profile.profilePicture} width="104" height="117" />
        </div>
        <div>
          <h1>
            {firstName} {lastName}
          </h1>
          <p>Membre depuis le {memberSince}</p>
        </div>
      </div>
      <div className={styles.rightProfileCard}>
        <p>Distance totale parcourue</p>
        <div className={styles.distance}>
          <span>
            <img src={pictoDistance} alt="" width="34" height="34" />
            {user.statistics.totalDistance} km
          </span>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;
