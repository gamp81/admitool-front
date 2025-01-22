// FormularioDatosPersonales.js
import React, { useState } from 'react';
import '../style/datospersonales.css';

const DatosPersonales = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    cedula: '',
    estadoCivil: '',
    sexo: '',
    genero: '',
    etnia: '',
    tipoSangre: '',
    fechaNacimiento: '',
    edad: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'fechaNacimiento') {
      calcularEdad(value);
    }
  };

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    setFormData((prevState) => ({
      ...prevState,
      edad: edad.toString(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
    <div className="form-container">
      <p className='message'>Recuerde:
        <li>En esta sección debe ingresar información personal.</li>
        <li>Los campos marcados con asterisco (*) son obligatorios.</li>
        <li>Si los datos de sus nombres, apellidos, fecha de nacimiento, país, provincia, 
          ciudad no son correctos, favor acercarse a la Oficina de Admisiones con su identificación.</li>
      </p>

      <h2>PERSONAL</h2>
      <div className="form-grid">
        <div>
          <label>*Nombres</label>
          <input type="text" placeholder="Nombres" />
        </div>
        <div>
          <label>*Apellidos</label>
          <input type="text" placeholder="Apellidos" />
        </div>
        <div>
          <label>*Cédula</label>
          <input type="text" placeholder="Cédula" />
        </div>
        <div>
          <label>*Estado civil</label>
          <select>
            <option>Casado</option>
            <option>Soltero</option>
          </select>
        </div>
        <div>
          <label>*Sexo</label>
          <select>
            <option>HOMBRE</option>
            <option>MUJER</option>
          </select>
        </div>
        <div>
          <label>*Autoidentificación de género</label>
          <select>
            <option>MASCULINO</option>
            <option>FEMENINO</option>
            <option>NO BINARIO</option>
          </select>
        </div>
        <div>
          <label>*Etnia</label>
          <select>
            <option>Mestizo</option>
            <option>Indígena</option>
          </select>
        </div>
        <div>
          <label>*Tipo de sangre</label>
          <select>
            <option>O+</option>
            <option>A+</option>
          </select>
        </div>
        <div>
          <label>*Edad</label>
          <input type="number" placeholder="" />
        </div>
        <div>
          <label>*Fecha de nacimiento</label>
          <input type="date" value="" />
        </div>
      </div>

      <h2>COMUNICACIÓN</h2>
      <div className="form-grid">
        <div>
          <label>*Correo personal</label>
          <input type="email" placeholder="" />
        </div>
        <div>
          <label>*Código del país</label>
          <input type="text" placeholder="593" />
        </div>
        <div>
          <label>*Número de celular personal</label>
          <input type="text" placeholder="" />
        </div>
      </div>

      <h2>LUGAR DE NACIMIENTO</h2>
      <div className="form-grid">
        <div>
          <label>*País</label>
          <select>
            <option>ECUADOR</option>
            <option>COLOMBIA</option>
            <option>VENEZUELA</option>
            <option>PERU</option>
          </select>
        </div>
        <div>
          <label>*Estado / Provincia</label>
          <select>
            <option>GUAYAS</option>
            <option>PICHINCHA</option>
            <option>EL ORO</option>
            
          </select>
        </div>
        <div>
          <label>*Ciudad</label>
          <input type="text" placeholder="MACHALA" />
        </div>
      </div>

      <button className="submit-button">Guardar y Continuar →</button>
    </div>
    </form>
  );
};

export default DatosPersonales;