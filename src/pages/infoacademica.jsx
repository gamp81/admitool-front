import React, { useContext, useState,useEffect } from "react";
import Alert from '@mui/material/Alert';
import "../style/infoacademica.css";
import { arraycolegios } from '../data/colegios';
import { UserContext } from '../context/UserContext';
import { useFormik } from "formik";
const InfoAcademica = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
      console.log("obtener los userData.institucionId:", userData.institucionId)
        fetch("https://localhost:7198/api/Catalog/GetInstitutions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
           
          }
        })
          .then(response => response.json())
          .then(result => {
            console.log("obtener los datos:", result.listData)
            setData(result.listData)})
          .catch(error => console.log("Error al obtener los datos:", error));
      }, []);

    const {userData} = useContext(UserContext);
   
    const formikEdu=useFormik({
      initialValues: {
        postulantId:userData.id,
        institutionId: userData.institucionId
      },
      onSubmit:(values)=>{
        const data={...values};
        fetch("https://localhost:7198/api/Postulant/UpdateInstitutionDataPostulant",{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(data)
        }).then(result=>{
          alert("Registro completado");
        }).catch(error=>{console.log(error);});
      }
    })
    return (
        <>
       <div className="container">
              <Alert
            //icon={<InfoIcon fontSize="inherit" />}
                severity="info"
                sx={{
                  backgroundColor: '#e0f7fa', // Fondo celeste
                  color: '#00796b', // Color del texto
                  '& .MuiAlert-icon': {
                    color: '#00796b', // Color del ícono
                  },
                }}
              ><p>Estimado aspirante, por favor seleccione el colegio de su precedencia. Si tu colegio no se encuentra en la lista, 
                por favor llena el siguiente formulario:https://forms.gle/DzK5KunE1rCbGRvf9</p>
              </Alert>
          <div>
              <form onSubmit={formikEdu.handleSubmit} >
                <label>Seleccione el colegio</label>
                <select id="arraycolegios"
                  name="institutionId"
                    value={formikEdu.values.institutionId}
                    onChange={formikEdu.handleChange}
                    onBlur={formikEdu.handleBlur}>
                      <option value="" disabled>
                      -- Selecciona --
                      </option>
                      {data?.map((option) => (
                      <option key={option.id} value={option.id}>
                          {option.name}
                      </option>
                      ))}
                  </select>
                  <button type="submit" className="submit-button">Guardar y Continuar →</button>
              </form>
          </div>
          
          
          </div>
        
        </>
    );
}

export default InfoAcademica;