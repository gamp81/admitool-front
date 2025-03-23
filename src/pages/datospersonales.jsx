// FormularioDatosPersonales.js
import React, { useContext, useEffect, useState } from 'react';
import '../style/datospersonales.css';
import { etnias,arraygenero } from "../data/datos";
import { paises,provincias,ciudadesEcuador } from '../data/paises';
import { useFormik } from "formik";
import { DatosPersonalesValidationSchema } from '../pages/utils/validateForm';
import { UserContext, UserProvider } from '../context/UserContext';
const DatosPersonales = () => {
  const {userData} = useContext(UserContext);
 

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

const formikDatosP = useFormik({
    initialValues: {
      id:userData.id,
      identificacion: userData.identificacion,
      nombres: userData.nombres,
      apellidos: userData.apellidos,
      email: userData.email,
      estadocivil: userData.estadoCivil,
      sexo: userData.sexo,
      genero: userData.Genero,
      etnia: userData.etnia,
      TipoSangre: userData.tipoSangre,
      fechaNacimiento: userData.fechaNacimiento,
      edad: userData.edad,
      celular:userData.celular,
      pais:userData.pais,
      provincia:userData.provincia,
      ciudad:userData.ciudad,
      emailContacto:userData.emailContacto

    },
    validationSchema: DatosPersonalesValidationSchema,
    onSubmit: (values) => {
      const allData = { ...values };
      console.log("Datos enviados:", allData);
      fetch("https://localhost:7198/api/Postulant/UpdateDataPostulant",{
        method: 'POST',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(allData)
      }).then(result=>{
        console.log('resultado',result);
        alert("Registro completado.");
      
      })
      .catch(error=>{
        console.log(error);
      });
    },
  });


  return (
    <>
    <form onSubmit={formikDatosP.handleSubmit} className="formulario">
   
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
          <input type="text" placeholder="Nombres" 
            name="nombres"
            value={formikDatosP.values.nombres}
            onChange={formikDatosP.handleChange}
            onBlur={formikDatosP.handleBlur}
            disabled/>
        </div>
        <div>
          <label>*Apellidos</label>
          <input type="text" placeholder="Apellidos" 
            name="apellidos"
            value={formikDatosP.values.apellidos}
            onChange={formikDatosP.handleChange}
            onBlur={formikDatosP.handleBlur}
            disabled />
        </div>
        <div>
          <label>*Cédula</label>
          <input type="text" placeholder="Cédula" 
            name="identificacion"
            value={formikDatosP.values.identificacion}
            onChange={formikDatosP.handleChange}
            onBlur={formikDatosP.handleBlur}
            disabled />
        </div>
        <div>
          <label>*Estado civil
          <select
                  name="estadocivil"
                  value={formikDatosP.values.estadocivil}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}
                >
                  <option value="">Seleccione</option>
                  <option value="Soltero">Soltero</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Casado">Casado</option>
                  <option value="Viudo">Viudo</option>
          </select>
                {formikDatosP.touched.estadocivil && formikDatosP.errors.estadocivil && (
                  <div className="error">{formikDatosP.errors.estadocivil}</div>
                )}

          </label>
         
        </div>
        <div>
          <label>
                  Sexo
                  <select
                    name="sexo"
                    value={formikDatosP.values.sexo}
                    onChange={formikDatosP.handleChange}
                    onBlur={formikDatosP.handleBlur}
                  >
                    <option value="">Seleccione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                  {formikDatosP.touched.sexo && formikDatosP.errors.sexo && (
                    <div className="error">{formikDatosP.errors.sexo}</div>
                  )}
          </label>
        </div>
        <div>
          <label>
          *Autoidentificación de género
                  <select
                    name="genero"
                    value={formikDatosP.values.genero}
                    onChange={formikDatosP.handleChange}
                    onBlur={formikDatosP.handleBlur}
                  >
                    <option value="">Seleccione</option>
                      {arraygenero.map((genero,index)=>(
                        <option key={index} value={genero.id}>
                          {genero.value}
                          </option>
                      ))                      
                      }
                  </select>
                  {formikDatosP.touched.genero && formikDatosP.errors.genero && (
                    <div className="error">{formikDatosP.errors.genero}</div>
                  )}
          </label>
        </div>
        <div>        
          <label>*Etnia
          <select
                  name="etnia"
                  value={formikDatosP.values.etnia}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}
                >
                   <option value="">Seleccione</option>
                      {etnias.map((etnia, index) => (
                        <option key={index} value={etnia.id}>
                          {etnia.value}
                        </option>
                      ))}
                 
                </select>
                {formikDatosP.touched.etnia && formikDatosP.errors.etnia && (
                  <div className="error">{formikDatosP.errors.etnia}</div>
                )}
          </label>
         
        </div>
        <div>
          <label>*Tipo de sangre
          <select
                  name="TipoSangre"
                  value={formikDatosP.values.TipoSangre }
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}
                >
                  <option value="">Seleccione</option>
                  <option value="O+">O+</option><option value="O+">O-</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option><option value="D">D</option>
                </select>
                {formikDatosP.touched.TipoSangre  && formikDatosP.errors.TipoSangre  && (
                  <div className="error">{formikDatosP.errors.TipoSangre }</div>
                )}
            
          </label>
        </div>
        <div>
          <label>*Fecha de nacimiento</label>
          <input type="date" name="fechaNacimiento"
                  value={formikDatosP.values.fechaNacimiento}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur} />
        </div>
        <div>
          <label>*Edad</label>
          <input type="number" name="edad"
                  value={formikDatosP.values.edad}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}  />
        </div>
       
      </div>

      <h2>COMUNICACIÓN</h2>
      <div className="form-grid">
        <div>
          <label>*Correo personal</label>
          <input type="email" 
                  name="email"
                  value={formikDatosP.values.email}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}
          />
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
                  value={formikDatosP.values.celular}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}
                />
                {formikDatosP.touched.celular && formikDatosP.errors.celular && (
                  <div className="error">{formikDatosP.errors.celular}</div>
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
                  value={formikDatosP.values.pais}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}
                >
                  <option value="">Seleccione</option>
                  {paises.map((pais,index)=>(
                      <option key={index} value={pais.siIdPais}>{pais.strNombre}</option>
                  ))}
                 
                </select>
               
                {formikDatosP.touched.pais && formikDatosP.errors.pais && (
                  <div className="error">{formikDatosP.errors.pais}</div>
                )}
          </label>
        </div>
        <div>
          <label>*Estado / Provincia
        
         { formikDatosP.values.pais==="1" ? ( 
          <select 
                name="provincia"
                  value={formikDatosP.values.provincia}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}>
              <option value="">Seleccione</option>
              {provincias.map((provincia,index)=>(
                <option key={index} value={provincia.siIdProvincia}>{provincia.strNombreProvincia}</option>
              ))}
              
          </select>
          ) : ( 
              <input
                  type="text"
                  name="provincia"
                  value={formikDatosP.values.provincia}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}
                />
          )}
          {formikDatosP.touched.provincia && formikDatosP.errors.provincia && (
                  <div className="error">{formikDatosP.errors.provincia}</div>
                )}
              </label>
        </div>
        <div>
          <label>*Ciudad
          { formikDatosP.values.pais==="1" ? (
            <select name="ciudad" value={formikDatosP.values.ciudad} onChange={formikDatosP.handleChange} onBlur={formikDatosP.handleBlur}
          > {ciudadesEcuador.filter((ciudad)=>String(ciudad.siIdProvincia)===formikDatosP.values.provincia).map((ciudad)=>(
            <option key={ciudad.siIdCanton} value={ciudad.siIdCanton}>{ciudad.strNombreCanton}</option>
          ))} 
          

          </select>
          ): (<input
                  type="text"
                  name="ciudad"
                  value={formikDatosP.values.ciudad}
                  onChange={formikDatosP.handleChange}
                  onBlur={formikDatosP.handleBlur}
                />)}
          
         
                {formikDatosP.touched.ciudad && formikDatosP.errors.ciudad && (
                  <div className="error">{formikDatosP.errors.ciudad}</div>
                )}
          </label>
         
        </div>
      </div>

      <button type="submit" >Guardar y Continuar →</button>
  
    </form>
    </>
  );
};

export default DatosPersonales;