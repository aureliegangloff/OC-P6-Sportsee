import { Outlet, Link, useNavigate } from "react-router";
import { useContext, useEffect } from "react";

import logo from "../assets/logo.png";
import iconLogo from "../assets/icon-logo.png";
import AuthContext from "../utils/context/AuthContext";
import "./Layout.css";

function MainLayout() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const hasValidSession = Boolean(token);

  useEffect(() => {
    if (!hasValidSession && window.location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [hasValidSession, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (!hasValidSession) {
    return <Outlet />;
  }

  return (
    <>
      <div className="container">
        <header>
          <img src={logo} alt="Logo Sportsee" width="157" height="24" />
          <div className="account-nav">
            <nav>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Mon profil</Link>
              <button type="button" onClick={handleLogout}>
                Se déconnecter
              </button>
            </nav>
          </div>
        </header>

        <div className="account-content">
          <Outlet />
        </div>
      </div>
      <footer>
        <div className="container-footer">
          <p>©Sportsee Tous droits réservés</p>
          <div className="nav-footer">
            <a href="#">Conditions générales</a>
            <a href="#">Contact</a>
            <img src={iconLogo} width="19" height="21" />
          </div>
        </div>
      </footer>
    </>
  );
}
export default MainLayout;
