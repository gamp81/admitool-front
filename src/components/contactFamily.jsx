import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { AuthContext } from "../context/AuthContext";
import { useFormik } from 'formik';
const ContactFamily = () => {
     const { user,token } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL ;
    const { userData } = useContext(UserContext);
    console.log('resultado userData',userData);
    const formikContact = useFormik({
        initialValues:{
            postulantId:userData.id,
            contactName: userData.nombreContacto,
            contactPhone: userData.telefonoContacto,
            contactEmail: userData.emailContacto
        },
        onSubmit:(values)=>{
            
            const allData={...values};
            fetch(`${apiUrl}Postulant/UpdateContactDataPostulant`,{
                method: 'POST',
                headers:{ 'Content-Type':'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify(allData)
              }).then(result=>{
                console.log('resultado',result);
                alert("Registro completado.");
              
              })
              .catch(error=>{
                console.log(error);
              });   
        }
    });
    //console.log("nombres ",userData)
    return (
        <div className='container'>
            <form onSubmit={formikContact.handleSubmit}>
            <div className="form-grid">
                <div>
                    <label>*Nombres</label>
                    <input type="text" placeholder="Nombres" 
                        name="contactName"
                        value={formikContact.values.contactName}
                        onChange={formikContact.handleChange}
                        onBlur={formikContact.handleBlur}
                       />
                    </div>
                <div>
                <label>*Correo personal</label>
                <input type="email" 
                        name="contactEmail"
                        value={formikContact.values.contactEmail}
                        onChange={formikContact.handleChange}
                        onBlur={formikContact.handleBlur}
                />
                </div>
                
                <div>
                <label>*Número de celular personal</label>
                <input
                        type="text"
                        name="contactPhone"
                        value={formikContact.values.contactPhone}
                        onChange={formikContact.handleChange}
                        onBlur={formikContact.handleBlur}
                        />
                        {formikContact.touched.contactPhone && formikContact.errors.contactPhone && (
                        <div className="error">{formikContact.errors.contactPhone}</div>
                        )}
                
                
                </div>
            </div>
            <button type="submit" className="submit-button">Guardar→</button>
            </form>
            
    </div>
    );
}

export default ContactFamily;