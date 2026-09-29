import { useState } from "react";
import { deleteCookie, getCookie, setCookie } from "../cookies";
import AuthContext from "./AuthContext";
import { users } from "../../data/users";
import { userActivity } from "../../data/user-activity";

const AUTH_TOKEN_NAME = "sportsee_token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getCookie(AUTH_TOKEN_NAME) ?? null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [activityUser, setActivityUser] = useState([]);

  const login = (token, userID) => {
    setCookie(AUTH_TOKEN_NAME, token, 1);
    setToken(token);
    setUserId(userID);
    setUser(users.find((item) => item.id === userID));
    const selectedActivity = userActivity.find((item) => item.id === userID);
    setActivityUser(selectedActivity?.activities ?? []);
  };

  const logout = () => {
    deleteCookie(AUTH_TOKEN_NAME);
    setToken(null);
    setUserId(null);
    setUser(null);
    setActivityUser([]);
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, user, activityUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
