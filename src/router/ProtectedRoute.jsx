import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import rolesConfig from "../config/rolesConfig";
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated,token,user } = useAuth();
  console.log("muestra isAuthenticated en ProtectedRoute:  ",isAuthenticated);
  if (!isAuthenticated && !token) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !rolesConfig[user.role]?.some(route=>allowedRoles.includes(route))) {
    return <Navigate to="/" replace/>;
  }

  return <Outlet/>;
};

export default ProtectedRoute;