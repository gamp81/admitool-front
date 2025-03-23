import * as yup from "yup";

export const LoginValidate = yup.object().shape({
    correo: yup.string().trim().required("El correo no puede quedar vacio"),
    password: yup.string().trim().required("La contraseña es requerida"),
});
export const step1ValidationSchema = yup.object({
  Identification: yup.string()
      .required("El número de cédula es obligatorio.")
      .matches(/^\d+$/, "Solo se permiten números.")
      .min(10, "El número de cédula debe tener al menos 10 dígitos."),
    Name: yup.string().required("Los nombres son obligatorios."),
    LastName: yup.string().required("El apellido paterno es obligatorio."),
    apellidoMaterno: yup.string().required("El apellido materno es obligatorio."),
    sexo: yup.string().required("El sexo es obligatorio."),
   
    fechaNacimiento: yup.date()
      //.required("La fecha de nacimiento es obligatoria.")
      .nullable(),
 
  });
  export const DatosPersonalesValidationSchema = yup.object({
    estadocivil:yup.string().required("El estado civil es obligatorio."),
    sexo:yup.string().required("El campo es obligatorio."),
    genero:yup.string().required("El campo es obligatorio."),
    etnia:yup.string().required("La etnia es obligatorio."),
    TipoSangre:yup.string().required("El tipo de sangre es obligatorio."),
    celular:yup.string().required("El campo es obligatorio."),
    pais:yup.string().required("El campo es obligatorio."),
    provincia:yup.string().required("El campo es obligatorio."),
    ciudad:yup.string().required("El campo es obligatorio."),
  });
  export const step2ValidationSchema = yup.object({
    email: yup.string()
      .email("Debe ser un correo válido.")
      .required("El correo es obligatorio."),
    password: yup.string()
      .required("La contraseña es obligatoria.")
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
  });
export const CreacionCuentaValidate = yup.object().shape({
  IdentificationType: yup.string().trim().required("Debe seleccionar un tipo de identificacion no puede quedar vacio"),
    Identification: yup.string().trim().required("La identificación es requerida")
        .test('validar-identificacion', 'Identificación no válida', function (value) {
            const tipoidentificacion = this.parent.tipoidentificacion;
            if (!value) return false; // Si el valor es nulo, no es válido
            if (tipoidentificacion === 'CED') {
                // Validar cédula ecuatoriana
                const cedulaRegex = /^[0-9]{10}$/;
                return cedulaRegex.test(value)
            } else if (tipoidentificacion === 'PAS') {
                // Puedes agregar la lógica de validación para pasaporte aquí si la necesitas
                const pasaporteRegex = /^[a-zA-Z0-9]{13}$/;
                return pasaporteRegex.test(value);
            } else {
                // Si el tipo de identificación no es 'CED' ni 'PAS', no necesitas validar
                return true;
            }
        }),
         nombres: yup.string().required("Los nombres son obligatorios."),
          apellidoPaterno: yup.string().required("El apellido paterno es obligatorio."),
             apellidoMaterno: yup.string().required("El apellido materno es obligatorio."),
             sexo: yup.string().required("El sexo es obligatorio."),
             fechaNacimiento: yup.date()
               .required("La fecha de nacimiento es obligatoria.")
               .nullable(),
    fechaexpedicion: yup.string().trim().required("La fecha expedición es requerida"),
    correo: yup.string().trim().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
    rCorreoElectronico: yup.string().trim().oneOf([yup.ref('correo')], 'Los correos electrónicos deben ser iguales').required('La confirmación del correo electrónico es requerida'),
});

export const RecuperarCuentaValidate = yup.object().shape({
    tipoidentificacion: yup.string().trim().required("El correo no puede quedar vacio"),
    pas: yup.string().trim().required("La contraseña es requerida"),
});
export const AreaConocimiento = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio."),
  descripcion: yup.string().required("La descripcion es obligatoria."),
});

export const ProgramaAcademico = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio."),
  descripcion: yup.string().required("La descripcion es obligatoria."),
  modalidad: yup.string().required("La descripcion es obligatoria."),
});