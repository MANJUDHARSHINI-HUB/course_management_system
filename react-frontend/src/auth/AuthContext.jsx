import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function readSession() {
  try {
    const path = window.location.pathname || "";
    const roleKey = path.includes("admin-") || path.includes("admin-dashboard") ? "eduledger_admin_session" : "eduledger_student_session";
    return JSON.parse(localStorage.getItem(roleKey) || localStorage.getItem("eduledger_session") || "null");
  } catch { return null; }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  function login(role, username, extra = {}) {
    const value = { role, username, ...extra };
    setSession(value);
    localStorage.setItem("eduledger_session", JSON.stringify(value));
    localStorage.setItem(role === "student" ? "eduledger_student_session" : "eduledger_admin_session", JSON.stringify(value));
  }

  function logout() {
    setSession(null);
    localStorage.removeItem("eduledger_session");
    localStorage.removeItem("eduledger_student_session");
    localStorage.removeItem("eduledger_admin_session");
  }

  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
