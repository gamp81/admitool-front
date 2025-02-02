import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("muestra isAuthenticated:",isAuthenticated);
  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;