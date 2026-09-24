import { Outlet, Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { users } from "../data/users";
import logo from "../assets/logo.png";
import "./Layout.css";
import { deleteCookie, getCookie } from "../utils/cookies";

function MainLayout() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = users.find((item) => item.id === userId);
  const token = getCookie("sportsee_token");
  const hasValidSession = Boolean(user && token && token === user.id);

  useEffect(() => {
    if (!hasValidSession && window.location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [hasValidSession, navigate]);

  const handleLogout = () => {
    deleteCookie("sportsee_token");
    navigate("/", { replace: true });
  };

  if (!hasValidSession) {
    return <Outlet />;
  }

  return (
    <div className="page">
      <header>
        <img src={logo} alt="Logo Sportsee" width="157" height="24" />
        <div className="account-nav">
          <nav>
            <Link to={`/dashboard/${user.id}`}>Dashboard</Link>
            <Link to={`/profile/${user.id}`}>Mon profil</Link>
            <button type="button" onClick={handleLogout}>
              Se déconnecter
            </button>
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
