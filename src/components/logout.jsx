import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./logoutbutton.css";
const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama al método logout del contexto
    navigate("/login"); // Redirige al usuario al login
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;