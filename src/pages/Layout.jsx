import { Outlet, Link, useParams } from "react-router";
import { users } from "../data/users";

function MainLayout() {
  const { userId } = useParams();
  const user = users.find((item) => item.userId === userId);

  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="page">
      <header>
        <div className="account-nav">
          <nav>
            <Link to={`/user/${userId}/`}>Dashboard</Link>
            <Link to={`/user/${userId}/profile`}>Mon profil</Link>
            <Link to="/">Se déconnecter</Link>
          </nav>
        </div>
      </header>

      <div className="account-content">
        <Outlet />
      </div>
      <footer>Mon footer</footer>
    </div>
  );
}
export default MainLayout;
