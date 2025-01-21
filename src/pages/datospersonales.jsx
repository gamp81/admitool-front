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
      <h2>PERSONAL</h2>
      <div className="form-grid">
        <div>
          <label>*Nombres</label>
          <input type="text" placeholder="GONZALO" />
        </div>
        <div>
          <label>*Apellidos</label>
          <input type="text" placeholder="Moncada Paz" />
        </div>
        <div>
          <label>*Cédula</label>
          <input type="text" placeholder="0703178830" />
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
          <input type="number" placeholder="43" />
        </div>
        <div>
          <label>*Fecha de nacimiento</label>
          <input type="date" value="1981-08-04" />
        </div>
      </div>

      <h2>COMUNICACIÓN</h2>
      <div className="form-grid">
        <div>
          <label>*Correo personal</label>
          <input type="email" placeholder="gmitiweb@gmail.com" />
        </div>
        <div>
          <label>*Código del país</label>
          <input type="text" placeholder="593" />
        </div>
        <div>
          <label>*Número de celular personal</label>
          <input type="text" placeholder="86536029" />
        </div>
      </div>

      <h2>LUGAR DE NACIMIENTO</h2>
      <div className="form-grid">
        <div>
          <label>*País</label>
          <select>
            <option>ECUADOR</option>
          </select>
        </div>
        <div>
          <label>*Estado / Provincia</label>
          <select>
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