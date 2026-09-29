import { useState } from "react";
import { deleteCookie, getCookie, setCookie } from "../cookies";
import AuthContext from "./AuthContext";
import { users } from "../../data/users";
import { userActivity } from "../../data/user-activity";

const AUTH_TOKEN_NAME = "sportsee_token";

export const AuthProvider = ({ children }) => {
  // Reconstitue la session depuis le token conservé dans le cookie.
  const [session, setSession] = useState(() => {
    const savedToken = getCookie(AUTH_TOKEN_NAME);
    const savedUser = users.find((item) => item.token === savedToken) ?? null;
    const savedActivity = userActivity.find(
      (item) => item.id === savedUser?.id,
    );

    return {
      token: savedUser ? savedToken : null,
      userId: savedUser?.id ?? null,
      user: savedUser,
      activityUser: savedActivity?.activities ?? [],
    };
  });

  const login = (token, userID) => {
    // Enregistre le token et synchronise l'utilisateur avec ses activités.
    setCookie(AUTH_TOKEN_NAME, token, 1);
    const selectedUser = users.find((item) => item.id === userID) ?? null;
    const selectedActivity = userActivity.find((item) => item.id === userID);
    setSession({
      token,
      userId: userID,
      user: selectedUser,
      activityUser: selectedActivity?.activities ?? [],
    });
  };

  const logout = () => {
    // Supprime le cookie et réinitialise les données de session.
    deleteCookie(AUTH_TOKEN_NAME);
    setSession({ token: null, userId: null, user: null, activityUser: [] });
  };

  return (
    <AuthContext.Provider value={{ ...session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
