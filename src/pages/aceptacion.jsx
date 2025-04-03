import React, { useEffect, useState,useContext } from "react";
import {AuthContext} from '../context/AuthContext'
import { UserContext } from '../context/UserContext';
import CardMenu from '../components/cardMenu';
const Aceptacion= ()=> {
    const { userData } = useContext(UserContext);
    const { token } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [data,setData] = useState([]);
    const [postulanteData,setPostulanteData] = useState([]);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async () => {
        try {
            console.log("El componente se ha renderizado");
            const response = await fetch(`${apiUrl}/api/AsignacionCurso/asignacion/aspirante?identificacion=${userData?.identificacion}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Datos obtenidos result.data: ", result.data);
            setPostulanteData(result.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

  
        // Filtrar la carrera con prioridad 1
       /*  const firstPriorityCareer = postulanteData.careerResponses.filter(
          (career) => career.priority === 1
        ); */
   
  
    
    return (  
        <div className="container p-4">
            <div className="header">
                <h3 className="me-auto">Aceptacion </h3>  
            </div>
            <div className="aceptacion">
                    <p>Estimado {userData?.nombres} {userData?.apellidos} se le ha asignado un cupo en la siguiente carrera</p>
                    {/*     {firstPriorityCareer ? (
                        <div>
                            <h3>Carrera Prioritaria</h3>
                            <p><strong>Nombre:</strong> {firstPriorityCareer.careerName}</p>
                            <p><strong>Área:</strong> {firstPriorityCareer.areaName}</p>
                        </div>
                        ) : (
                        <p>No hay carrera con prioridad 1.</p>
                        ) } */}
                    <p> Area de conocimiento : {postulanteData?.area}</p>
                    {/* <p> Carrera : {postulanteData?.careerResponses[0]?.careerName || "No hay datos disponibles"} </p> */}
                    <div className="card-containerAceptacion">
                        <CardMenu icon="✅" text="ACEPTAR" color="#f5a623" />
                        <CardMenu icon="❌​" text="RECHAZAR" color="#f5a623" />
                    </div>
            
            </div>
        </div>


    );
}

export default Aceptacion ;