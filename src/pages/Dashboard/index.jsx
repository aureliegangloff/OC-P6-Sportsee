import { Link, useParams } from "react-router";
import { users } from "../../data/users";

function Dashboard() {
  const { userId } = useParams();
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return (
      <div className="dashboard">
        <h1>Utilisateur introuvable</h1>
        <Link to="/">Retour à l'accueil</Link>
      </div>
    );
  }

  const { firstName, lastName } = user.profile;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>
        Bonjour {firstName} {lastName}
      </p>
    </div>
  );
}

export default Dashboard;
