import React, { useEffect, useState,useContext } from "react";
import {AuthContext} from '../context/AuthContext'
import { UserContext } from '../context/UserContext';
import CardMenu from '../components/cardMenu';
import {useNavigate} from "react-router-dom"
const Aceptacion= ()=> {
    const { userData } = useContext(UserContext);
    const { token } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_ADMIN;
    const [data,setData] = useState([]);
    const [postulanteData,setPostulanteData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async () => {
        try {
            console.log("El componente se ha renderizado");
            const response = await fetch(`${apiUrl}AsignacionCurso/asignacion/aspirante?identificacion=${userData?.identificacion}`, {
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
            //console.log("Datos obtenidos result.data: ", result.data);
            setPostulanteData(result.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const handleAceptar =()=>{
        console.log("hola desde hablde ");
        navigate("/menu");
    }
    const handleRechazar =()=>{
        console.log("hola desde handleRechazar ");
        navigate("/menu");
    }
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
                    <p> Area de conocimiento : {postulanteData?.area || "No se encontro registro"}  </p>
                    <p> Carrera : {postulanteData?.careerName || "No hay datos disponibles"} </p>
                    <div className="card-containerAceptacion">
                        <button onClick={() => handleAceptar()}><CardMenu icon="✅" text="ACEPTAR" color="#f5a623"   /></button>
                        <button onClick={() => handleRechazar()}><CardMenu icon="❌​" text="RECHAZAR" color="#f5a623" /></button>
                    </div>
            
            </div>
        </div>


    );
}

export default Aceptacion ;