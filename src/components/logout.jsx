import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama al método logout del contexto
    navigate("/login"); // Redirige al usuario al login
  };

  return {handleLogout};
};

export default LogoutButton;