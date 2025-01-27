// FormularioDatosPersonales.js
import React, { useState } from 'react';
import '../style/datospersonales.css';
import { etnias,arraygenero } from "../data/datos";
import { paises } from '../data/paises';
import { useFormik } from "formik";
import { step1ValidationSchema,step2ValidationSchema } from '../pages/utils/validateForm';
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

  /* const handleChange = (e) => {
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
  }; */
const formikStep1 = useFormik({
    initialValues: {
      tipoIdentificacion: '',
      identificacion: '',
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
      celular:''
    },
    validationSchema: step1ValidationSchema,
    onSubmit: (values) => {
      const allData = { ...formikStep1.values, ...values };
      console.log("Datos enviados:", allData);
      alert("Registro completado.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log(formData);
  };

  return (
    <form onSubmit={formikStep1.handleSubmit} className="formulario">
    {/* <div className="form-container"> */}
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
          <input type="text" placeholder="Nombres" disabled/>
        </div>
        <div>
          <label>*Apellidos</label>
          <input type="text" placeholder="Apellidos" disabled />
        </div>
        <div>
          <label>*Cédula</label>
          <input type="text" placeholder="Cédula" disabled />
        </div>
        <div>
          <label>*Estado civil
          <select
                  name="estadocivil"
                  value={formikStep1.values.estadocivil}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                >
                  <option value="">Seleccione</option>
                  <option value="Soltero">Soltero</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Casado">Casado</option>
                  <option value="Viudo">Viudo</option>
                </select>
                {formikStep1.touched.estadocivil && formikStep1.errors.estadocivil && (
                  <div className="error">{formikStep1.errors.estadocivil}</div>
                )}

          </label>
         
        </div>
        <div>
        <label>
                Sexo
                <select
                  name="sexo"
                  value={formikStep1.values.sexo}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                >
                  <option value="">Seleccione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
                {formikStep1.touched.sexo && formikStep1.errors.sexo && (
                  <div className="error">{formikStep1.errors.sexo}</div>
                )}
              </label>
        </div>
        <div>
        <label>
        *Autoidentificación de género
                <select
                  name="genero"
                  value={formikStep1.values.genero}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                >
                  <option value="">Seleccione</option>
                    {arraygenero.map((genero,index)=>(
                      <option key={index} value={genero.id}>
                        {genero.value}
                        </option>
                    ))                      
                    }
                 </select>
                {formikStep1.touched.genero && formikStep1.errors.genero && (
                  <div className="error">{formikStep1.errors.genero}</div>
                )}
              </label>
          
        </div>
        <div>        
          <label>*Etnia
          <select
                  name="etnia"
                  value={formikStep1.values.etnia}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                >
                   <option value="">Seleccione</option>
                      {etnias.map((etnia, index) => (
                        <option key={index} value={etnia.id}>
                          {etnia.value}
                        </option>
                      ))}
                 
                </select>
                {formikStep1.touched.etnia && formikStep1.errors.etnia && (
                  <div className="error">{formikStep1.errors.etnia}</div>
                )}
          </label>
         
        </div>
        <div>
          <label>*Tipo de sangre
          <select
                  name="sangre"
                  value={formikStep1.values.sangre}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                >
                  <option value="">Seleccione</option>
                  <option value="O+">O+</option><option value="O+">O-</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option><option value="D">D</option>
                </select>
                {formikStep1.touched.sangre && formikStep1.errors.sangre && (
                  <div className="error">{formikStep1.errors.sangre}</div>
                )}
            
          </label>
         
        </div>
        <div>
          <label>*Fecha de nacimiento</label>
          <input type="date" value="" disabled/>
        </div>
        <div>
          <label>*Edad</label>
          <input type="number" placeholder="" disabled/>
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
          <label>*Número de celular personal
          <input
                  type="text"
                  name="celular"
                  value={formikStep1.values.celular}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                />
                {formikStep1.touched.celular && formikStep1.errors.celular && (
                  <div className="error">{formikStep1.errors.celular}</div>
                )}
          </label>
        
        </div>
      </div>

      <h2>LUGAR DE NACIMIENTO</h2>
      <div className="form-grid">
        <div>
          <label>*País
          <select
                  name="pais"
                  value={formikStep1.values.pais}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                >
                  <option value="">Seleccione</option>
                  {paises.map((pais,index)=>(
                      <option key={index} value={pais.siIdPais}>{pais.strNombre}</option>
                  ))}
                 
                </select>
                {formikStep1.touched.pais && formikStep1.errors.pais && (
                  <div className="error">{formikStep1.errors.pais}</div>
                )}
          </label>
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
          <label>*Ciudad
          <input
                  type="text"
                  name="ciudad"
                  value={formikStep1.values.ciudad}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                />
                {formikStep1.touched.ciudad && formikStep1.errors.ciudad && (
                  <div className="error">{formikStep1.errors.ciudad}</div>
                )}
          </label>
         
        </div>
      </div>

      <button className="submit-button" onClick={handleSubmit}>Guardar y Continuar →</button>
    {/* </div> */}
    </form>
  );
};

export default DatosPersonales;