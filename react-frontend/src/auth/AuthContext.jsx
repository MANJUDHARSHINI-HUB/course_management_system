import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem("eduledger_session")); }
    catch { return null; }
  });

  function login(role, username) {
    const value = { role, username };
    setSession(value);
    localStorage.setItem("eduledger_session", JSON.stringify(value));
  }

  function logout() {
    setSession(null);
    localStorage.removeItem("eduledger_session");
  }

  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
