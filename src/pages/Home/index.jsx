import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import styles from "./Home.module.css";
import logo from "../../assets/logo.png";
// import { users } from "../../data/users";

import { fetchLoginUser } from "../../utils/api.js";
import AuthContext from "../../utils/context/AuthContext";

function getLoginErrorMessage(error) {
  if (error instanceof TypeError) {
    return "Impossible de joindre le serveur. Vérifiez votre connexion puis réessayez.";
  }

  const status = error?.status;
  const code = error?.code;

  if (code === "LOGIN" && [400, 401].includes(status)) {
    return "Adresse e-mail ou mot de passe incorrect.";
  }

  if (code === "USER_INFO" && status === 401) {
    return "La connexion n’a pas pu être validée. Veuillez réessayer.";
  }

  if (status === 403) {
    return "Vous n’êtes pas autorisé à accéder à ce service.";
  }

  if (status === 404) {
    return "Le service de connexion est introuvable. Veuillez réessayer plus tard.";
  }

  if (status >= 500) {
    return "Le serveur rencontre un problème. Veuillez réessayer plus tard.";
  }

  return "Une erreur inattendue est survenue. Veuillez réessayer.";
}

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token, login } = useContext(AuthContext);
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const { token } = await fetchLoginUser(username, password);
      await login(token);
      navigate(`/dashboard`);
    } catch (error) {
      setError(getLoginErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <img src={logo} alt="Logo Sportsee" width="157" />

        <div className={styles.card}>
          <h1>Transformez vos stats en résultats</h1>
          <form onSubmit={handleSubmit}>
            <h2>Se connecter</h2>

            <div className={styles.inputgroup}>
              <label htmlFor="username">Adresse email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.inputgroup}>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p role="alert" className={styles.alert}>
                {error}
              </p>
            )}

            <button className={`${styles.submitBtn}, btn-blue`} type="submit">
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>
          <a href="#" className={styles.forget}>
            Mot de passe oublié ?
          </a>
        </div>
      </main>
      <aside className={styles.aside}>
        <p>
          Analysez vos performances en un clin d’œil, suivez vos progrès et
          atteignez vos objectifs.
        </p>
      </aside>
    </div>
  );
}

export default Home;
