import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated,token } = useContext(AuthContext);
  console.log("muestra isAuthenticated en ProtectedRoute:  ",isAuthenticated);
  if (!isAuthenticated && !token) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;