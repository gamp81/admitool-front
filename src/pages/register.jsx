import React, { useState } from "react";
import { useFormik } from "formik";
import {useNavigate} from "react-router-dom"
import { step1ValidationSchema,step2ValidationSchema } from '../pages/utils/validateForm';
const CrearCuenta = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  // Esquemas de validación con Yup
  /* const step1ValidationSchema = Yup.object({
    identificacion: Yup.string()
      .required("El número de cédula es obligatorio.")
      .matches(/^\d+$/, "Solo se permiten números.")
      .min(10, "El número de cédula debe tener al menos 10 dígitos."),
    nombres: Yup.string().required("Los nombres son obligatorios."),
    apellidoPaterno: Yup.string().required("El apellido paterno es obligatorio."),
    apellidoMaterno: Yup.string().required("El apellido materno es obligatorio."),
    sexo: Yup.string().required("El sexo es obligatorio."),
    fechaNacimiento: Yup.date()
      .required("La fecha de nacimiento es obligatoria.")
      .nullable(),
  });

  const step2ValidationSchema = Yup.object({
    email: Yup.string()
      .email("Debe ser un correo válido.")
      .required("El correo es obligatorio."),
    contrasena: Yup.string()
      .required("La contraseña es obligatoria.")
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
  }); */

  // Formik para paso 1
  const formikStep1 = useFormik({
    initialValues: {
      IdentificationType: "Cédula",
      Identification: "",
      Name: "",
      LastName: "",
      apellidoMaterno: "",
      sexo: "",
      fechaNacimiento: "",
    },
    validationSchema: step1ValidationSchema,
    onSubmit: () => {
      setStep(2);
    },
  });

  // Formik para paso 2
  const formikStep2 = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: step2ValidationSchema,
    onSubmit: (values) => {
      const allData = { ...formikStep1.values, ...values };
      console.log("Datos enviados:", allData);
      //alert("Registro completado.");
      fetch("https://localhost:7173/api/Auth/CreateAccount",{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(allData)
      })//.then(response=>response.JSON() )
      .then(result=>{
        console.log('resultado',result);
        alert("Registro completado.");
        navigate("/login");

      })
      .catch(error=>{
        console.log(error);
      });
    },
  });

  return (
    <>
      {step === 1 && (
        <div>
          <h6>CREACIÓN DE CUENTA</h6>
          <div className="formulario-container">
            <form onSubmit={formikStep1.handleSubmit}>
              <label>
                Tipo Identificación
                <select
                  name="IdentificationType"
                  value={formikStep1.values.IdentificationType}
                  onChange={formikStep1.handleChange}
                >
                  <option value="CED">Cédula</option>
                  <option value="PASS">Pasaporte</option>
                </select>
              </label>
              <label>
                Ingrese su número de cédula
                <input
                  type="text"
                  name="Identification"
                  value={formikStep1.values.Identification}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                />
                {formikStep1.touched.Identification && formikStep1.errors.Identification && (
                  <div className="error">{formikStep1.errors.Identification}</div>
                )}
              </label>
              <label>
                Ingrese sus nombres
                <input
                  type="text"
                  name="Name"
                  value={formikStep1.values.Name}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                />
                {formikStep1.touched.Name && formikStep1.errors.Name && (
                  <div className="error">{formikStep1.errors.Name}</div>
                )}
              </label>
              <label>
                Ingrese su apellido paterno
                <input
                  type="text"
                  name="LastName"
                  value={formikStep1.values.LastName }
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                />
                {formikStep1.touched.LastName  && formikStep1.errors.LastName  && (
                  <div className="error">{formikStep1.errors.LastName }</div>
                )}
              </label>
              <label>
                Ingrese su apellido materno
                <input
                  type="text"
                  name="apellidoMaterno"
                  value={formikStep1.values.apellidoMaterno}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                />
                {formikStep1.touched.apellidoMaterno && formikStep1.errors.apellidoMaterno && (
                  <div className="error">{formikStep1.errors.apellidoMaterno}</div>
                )}
              </label>
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
              <label>
                Fecha de Nacimiento
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formikStep1.values.fechaNacimiento}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                />
                {formikStep1.touched.fechaNacimiento &&
                  formikStep1.errors.fechaNacimiento && (
                    <div className="error">{formikStep1.errors.fechaNacimiento}</div>
                  )}
              </label>
              <div className="form-buttons2">
                <button type="button" onClick={() => console.log("Volver")}>
                  VOLVER
                </button>
                <button type="submit">SIGUIENTE</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h6>CREACIÓN DE CUENTA</h6>
          <div className="formulario-container">
            <form onSubmit={formikStep2.handleSubmit}>
              <label>
                Ingrese su email
                <input
                  type="email"
                  name="email"
                  value={formikStep2.values.email}
                  onChange={formikStep2.handleChange}
                  onBlur={formikStep2.handleBlur}
                />
                {formikStep2.touched.email && formikStep2.errors.email && (
                  <div className="error">{formikStep2.errors.email}</div>
                )}
              </label>
              <label>
                Ingrese su contraseña
                <input
                  type="password"
                  name="password"
                  value={formikStep2.values.password}
                  onChange={formikStep2.handleChange}
                  onBlur={formikStep2.handleBlur}
                />
                {formikStep2.touched.password && formikStep2.errors.password && (
                  <div className="error">{formikStep2.errors.password}</div>
                )}
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
