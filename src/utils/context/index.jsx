import { createContext, useState } from "react";

import { deleteCookie, getCookie, setCookie } from "../cookies";

const AUTH_TOKEN_NAME = "sportsee_token";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getCookie(AUTH_TOKEN_NAME) ?? null);

  const login = (token) => {
    setCookie(AUTH_TOKEN_NAME, token, 1);
    setToken(token);
  };

  const logout = () => {
    deleteCookie(AUTH_TOKEN_NAME);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
