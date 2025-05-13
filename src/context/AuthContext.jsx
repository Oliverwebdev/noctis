// ----------------------------------------------------
//  AuthContext – verwaltet Login‑Status + User‑Daten
// ----------------------------------------------------
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);           // null = nicht eingeloggt
  const [loading, setLoading] = useState(true);

  /* --- Auf Start: Token aus localStorage lesen ------ */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  /* --- API ------------------------------------------------ */
  const login  = (token, userObj) => {
    localStorage.setItem("token", token);
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
