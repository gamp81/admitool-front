import React, { useState } from "react";
import "../style/crearcuenta.css";

const CrearCuenta = () => {
    const [step, setStep] = useState(1); // Controla qué vista mostrar
    const [formData, setFormData] = useState({
      tipoIdentificacion: "Cédula",
      numeroCedula: "",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      sexo: "",
      fechaNacimiento: "",
      email: "",
      contrasena: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleNext = () => {
      // Validación del primer formulario
      const {
        numeroCedula,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        sexo,
        fechaNacimiento,
      } = formData;
  
      if (
        numeroCedula &&
        nombres &&
        apellidoPaterno &&
        apellidoMaterno &&
        sexo &&
        fechaNacimiento
      ) {
        setStep(2); // Avanza al siguiente paso
      } else {
        alert("Por favor, complete todos los campos.");
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { email, contrasena } = formData;
  
      if (email && contrasena) {
        console.log("Datos enviados:", formData);
        alert("Registro completado.");
      } else {
        alert("Por favor, complete todos los campos.");
      }
    };

  return (
    <>
      {step === 1 && (
        <div>
            <h6>CREACIÓN DE CUENTA</h6>
            <div className="formulario-container">
            
            <form onSubmit={handleSubmit}>
                <label>
                Tipo Identificación
                <select
                    name="tipoIdentificacion"
                    value={formData.tipoIdentificacion}
                    onChange={handleChange}
                >
                    <option value="Cédula">Cédula</option>
                    <option value="Pasaporte">Pasaporte</option>
                </select>
                </label>
                <label>
                Ingrese su número de cédula
                <input
                    type="text"
                    name="numeroCedula"
                    value={formData.numeroCedula}
                    onChange={handleChange}
                />
                </label>
                <label>
                Ingrese sus nombres
                <input
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                />
                </label>
                <label>
                Ingrese su apellido paterno
                <input
                    type="text"
                    name="apellidoPaterno"
                    value={formData.apellidoPaterno}
                    onChange={handleChange}
                />
                </label>
                <label>
                Ingrese su apellido materno
                <input
                    type="text"
                    name="apellidoMaterno"
                    value={formData.apellidoMaterno}
                    onChange={handleChange}
                />
                </label>
                <label>
                Sexo
                <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                >
                    <option value="">Seleccione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
                </label>
                <label>
                Fecha de Nacimiento
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                />
                </label>
                <div className="form-buttons2">
                <button type="button" onClick={() => console.log("Volver")}>
                    VOLVER
                </button>
                <button type="button" onClick={handleNext}>SIGUIENTE</button>
                </div>
            </form>
        </div>
        </div>
     )}

     {step === 2 && (
         <div>
         <h6>CREACIÓN DE CUENTA</h6>
         <div className="formulario-container">
            <form onSubmit={handleSubmit}>
            <label>
                Ingrese su email
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                />
            </label>
            <label>
                Ingrese su contraseña
                <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                />
            </label>
            <div className="form-buttons">
                <button type="button" onClick={() => setStep(1)}>
                VOLVER
                </button>
                <button type="submit">REGISTRAR</button>
            </div>
            </form>
            </div>
       </div>
     )}
    </>
  );
};

export default CrearCuenta;