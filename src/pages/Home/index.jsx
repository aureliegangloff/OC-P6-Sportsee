import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import logo from "../../assets/logo.png";
import { users } from "../../data/users";

function Home() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const matchedUser = users.find(
      (user) =>
        user.username === credentials.username.trim() &&
        user.password === credentials.password,
    );

    if (!matchedUser) {
      setError("Identifiants incorrects. Veuillez réessayer.");
      return;
    }

    setError("");
    navigate(`/user/${matchedUser.userId}`);
  };

  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <img
          src={logo}
          alt="Logo Sportsee"
          width="157"
          className={styles["banner-logo"]}
        />

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
                value={credentials.username}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputgroup}>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
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
