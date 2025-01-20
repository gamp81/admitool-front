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
      <div className="campo">
        <label htmlFor="nombres">Nombres</label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
        />
      </div>
      <div className="campo">
        <label htmlFor="apellidos">Apellidos</label>
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
        />
      </div>
      <div className="campo">
        <label htmlFor="cedula">Cédula</label>
        <input
          type="text"
          id="cedula"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
      </div>
      <div className="campo">
        <label htmlFor="estadoCivil">Estado Civil</label>
        <select
          id="estadoCivil"
          name="estadoCivil"
          value={formData.estadoCivil}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="soltero">Soltero/a</option>
          <option value="casado">Casado/a</option>
          <option value="divorciado">Divorciado/a</option>
          <option value="viudo">Viudo/a</option>
        </select>
      </div>
      <div className="campo">
        <label htmlFor="sexo">Sexo</label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>
      <div className="campo">
        <label htmlFor="genero">Género</label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="noBinario">No Binario</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div className="campo">
        <label htmlFor="etnia">Etnia</label>
        <input
          type="text"
          id="etnia"
          name="etnia"
          value={formData.etnia}
          onChange={handleChange}
          required
        />
      </div>
      <div className="campo">
        <label htmlFor="tipoSangre">Tipo de Sangre</label>
        <input
          type="text"
          id="tipoSangre"
          name="tipoSangre"
          value={formData.tipoSangre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="campo">
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
        <input
          type="date"
          id="fechaNacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          required
        />
      </div>
      <div className="campo">
        <label htmlFor="edad">Edad</label>
        <input
          type="text"
          id="edad"
          name="edad"
          value={formData.edad}
          readOnly
        />
      </div>
      <div className="campo">
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default DatosPersonales;