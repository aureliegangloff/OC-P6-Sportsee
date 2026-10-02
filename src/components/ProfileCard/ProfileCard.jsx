import { useContext } from "react";
import AuthContext from "../../utils/context/AuthContext";

function ProfileCard() {
  const { user } = useContext(AuthContext);

  const { age, genre, height, weight } = user.profile;
  const heightInMeters = Math.floor(height / 100);
  const centimeters = height % 100;

  return (
    <div className="card">
      <h2>Votre profil</h2>
      <hr />
      <div className="card-body">
        <p>Âge : {age}</p>
        <p>Genre : {genre ? genre : "Non spécifié"}</p>
        <p>
          Taille : {heightInMeters}m{centimeters}
        </p>
        <p>Poids : {weight} kg</p>
      </div>
    </div>
  );
}

export default ProfileCard;
