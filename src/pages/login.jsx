import React, { useState } from "react";
import "../style/crearcuenta.css";

const Login = () => {
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <>
    <h6>INICIAR SESIÓN</h6>
    <div className="formulario-container">
   
      <form onSubmit={handleSubmit}>
        
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
        Contraseña:
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
         <div className="form-buttons">
          <button type="submit">INICIAR SESIÓN</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;