import { useState, useEffect } from "react";
import { deleteCookie, getCookie, setCookie } from "../cookies";
import AuthContext from "./AuthContext";
import { fetchUserInfos } from "../api";
// import { users } from "../../data/users";

const AUTH_TOKEN_NAME = "sportsee_token";

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const savedToken = getCookie(AUTH_TOKEN_NAME);
    // const savedUserInfos = await fetchUserInfos(savedToken) ?? null;

    return {
      token: savedToken,
      // user: savedUserInfos,
      user: null,
    };
  });

  useEffect(() => {
    const loadSavedUser = async () => {
      if (!session.token) return;

      try {
        const user = await fetchUserInfos(session.token);
        setSession((current) => ({
          ...current,
          user: user ?? null,
        }));
      } catch {
        deleteCookie(AUTH_TOKEN_NAME);
        setSession({ token: null, user: null });
      }
    };

    loadSavedUser();
  }, [session.token]);

  const login = async (token) => {
    // Enregistre le token et synchronise l'utilisateur
    const user = await fetchUserInfos(token);
    setCookie(AUTH_TOKEN_NAME, token, 1);
    setSession({
      token,
      user,
    });
  };

  const logout = () => {
    // Supprime le cookie et réinitialise les données de session.
    deleteCookie(AUTH_TOKEN_NAME);
    setSession({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
