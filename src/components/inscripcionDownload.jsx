import React, {useContext} from "react";
import "../style/Inscription.css";
import { useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Inscription = ()=> {
    const apiUrl = process.env.REACT_APP_API_URL ;
    const { user,token } = useContext(AuthContext);
    const location = useLocation();
    const carreras = location.state?.careers || [];
    const areac =  location.state?.area || null;
    const listamateria =  location.state?.lista || [];
    const areaId = location.state?.areaId || null;
    const registrationId = location.state?.registrationId || null;
    console.log("carreras",carreras);
    console.log("area ",areac);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const payload = {
            PostulanteId: parseInt(user?.usrId) || 0,
            areaId: areaId,
            registrationId: registrationId
          };
      
          console.log("Enviando datos desde inscrip:", payload);
          
          try {
            const response = await fetch(`${apiUrl}Inscription/GenerateProofRegistration`, {
              method: "POST",
              headers: { "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
               },
              body: JSON.stringify(payload),
            });
      
            if (!response.ok) throw new Error("Error al descargar el archivo");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "comprobante.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            navigate("/menu");
          } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error de conexión.");
          }
    }
    return (
        <div className="container">
        <div className="card1">
           
                <p className="title">Usted ha elegido este orden prioritario de carrera</p>
                {carreras?.map((career,index)=>(
                    <div className="priority" key={career.careerId} >
                       <p> <span>PRIORIDAD {index+1} :</span> {career.careerName}</p>
                    </div>       
                ))}           

                <div className="subtitle">
                <p className="subtitle">COMPONENTES DEL EXAMEN DE INGRESO</p>
                    <p className="exam">{listamateria}</p>
                </div>
           
            <button className="download-btn" onClick={handleSubmit}>
                DESCARGAR REGISTRO <i className="fa-solid fa-download"></i>
            </button>
        </div>
        </div>
      );
}

export default Inscription;