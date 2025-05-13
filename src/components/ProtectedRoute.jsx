// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ minHeight: "100vh" }} />; // TODO: fancy loader
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
