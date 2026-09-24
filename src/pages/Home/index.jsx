import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import logo from "../../assets/logo.png";
import { users } from "../../data/users";
import { setCookie } from "../../utils/cookies";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const matchedUser = users.find(
      (user) => user.username === username.trim() && user.password === password,
    );

    if (!matchedUser) {
      setError("Identifiants incorrects. Veuillez réessayer.");
      return;
    }

    setError("");
    setCookie("sportsee_token", matchedUser.id, 1);
    navigate(`/dashboard/${matchedUser.id}`);
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

            {error && <p role="alert">{error}</p>}

            <button type="submit">Se connecter</button>
          </form>
          <a href="#">Mot de passe oublié ?</a>
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
