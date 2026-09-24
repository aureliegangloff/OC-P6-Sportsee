import { useParams } from "react-router";
import { users } from "../../data/users";

function Profile() {
  const { userId } = useParams();
  const user = users.find((item) => item.userId === userId);

  const { firstName, lastName } = user.profile;
  return (
    <div className="profile">
      <h1>Mon profil</h1>
      <p>
        Bonjour {firstName} {lastName}
      </p>
    </div>
  );
}
export default Profile;
