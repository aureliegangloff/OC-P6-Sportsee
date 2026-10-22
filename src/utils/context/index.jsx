import { useState, useEffect } from "react";
import { deleteCookie, getCookie, setCookie } from "../cookies";
import AuthContext from "./AuthContext";
import { fetchUserInfos } from "../api";

const AUTH_TOKEN_NAME = "sportsee_token";

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const savedToken = getCookie(AUTH_TOKEN_NAME);

    return {
      token: savedToken,
      user: null,
      loading: Boolean(savedToken),
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
          loading: false,
        }));
      } catch {
        deleteCookie(AUTH_TOKEN_NAME);
        setSession({ token: null, user: null, loading: false });
      }
    };

    loadSavedUser();
  }, [session.token]);

  const login = async (token) => {
    // Save the token and sync the user
    const user = await fetchUserInfos(token);
    setCookie(AUTH_TOKEN_NAME, token, 1);
    setSession({
      token,
      user,
      loading: false,
    });
  };

  const logout = () => {
    // Delete the cookie and reset the session data.
    deleteCookie(AUTH_TOKEN_NAME);
    setSession({ token: null, user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
