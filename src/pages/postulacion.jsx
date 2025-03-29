// PostulacionView.js
import React,{useContext,useState,useEffect} from "react";
import "../style/postulacion.css";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from '../context/UserContext';
const Postulacion = () => {
  const { user,token} = useContext(AuthContext); // Obtiene los datos del usuario autenticado
  const {userData} = useContext(UserContext);
  const [ postulanteData, setPostulanteData] = useState(null);
  const [careers,setCareers] = useState([]);
 

useEffect(() => {
  if (!token) return; // Evita hacer la petición si token es null o undefined

  const fetchData = async () => {
      try {
          console.log("El componente se ha renderizado");
          const response = await fetch(`https://localhost:7198/api/Postulation/GetLastInscription`, {
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

  fetchData();
}, [token]); // Agregamos token como dependencia

useEffect(() => {
  console.log("Datos actualizados postulanteData:", postulanteData);
  setCareers(postulanteData?.careerResponses.map(c => c.careerName));
}, [postulanteData]); // Este useEffect se ejecuta cuando postulanteData cambia
useEffect(() => {
 
  console.log("Datos obtenidos setCareers: ",careers);
},[careers]);


  return (
    <div className="postulacion-container">
      <h2 className="title">Postulación</h2>
      <div className="">
        <h2 className="subtitle">Datos Personales</h2>
        <div className="field-group">
          <label>Nombres:</label>
          <span>{userData?.nombres} {userData?.apellidos}</span>
         
        </div>
        <div className="field-group">
          <label>Identificación:</label>
          <span>{userData?.identificacion}</span>
        </div>
        <div className="field-group">
          <label>Correo:</label>
          <span>{userData?.email}</span>
        </div>
      </div>

      
      <div className="career-selection-container">
      <h2 className="section-title">Carreras Elegidas</h2>
      <div className="careers">
      {careers.map((career, index) => (
        
        <div className="career">
          <div className="circle blue">{index+1}</div>
          <p key={index}>{career}</p>
          <span>Preferencia</span>
        </div>))}
        {/* <div className="career">
          <div className="circle blue">2</div>
          <p>Electricidad</p>
          <span>Preferencia</span>
        </div>
        <div className="career">
          <div className="circle blue">3</div>
          <p>Telecomunicaciones</p>
          <span>Preferencia</span>
        </div> */}
      </div>
      <button className="change-career-button">Cambiar Carrera</button>

      <h2 className="section-title">Orden de Asignación</h2>
      <div className="assignment-groups">
        <div className="group">
          <div className="circle green">1</div>
          <p>Grupo de mayor vulnerabilidad socioeconómica</p>
          <div className="status-check">✔</div>
        </div>
        <div className="group">
          <div className="circle teal">2</div>
          <p>Grupo de Mérito Académico</p>
          <div className="status-check">✔</div>
        </div>
        <div className="group">
          <div className="circle purple">3</div>
          <p>Bachiller de último período académico</p>
          <div className="status-cross">✘</div>
        </div>
        <div className="group">
          <div className="circle orange">4</div>
          <p>Población general</p>
          <div className="status-cross">✘</div>
        </div>
      </div>
      <div className="container">
        <h2 className="subtitle">Política de Acción Afirmativa</h2>
        <div className="affirmative-policy">
          <div>Condición Social: <strong>15 pts</strong></div>
          <div>Ruralidad: <strong>5 pts</strong></div>
          <div>Territorialidad: <strong>10 pts</strong></div>
          <div>Vulnerabilidad: <strong>10 pts</strong></div>
          <div>Pueblos y Nacionalidades Indígenas: <strong>10 pts</strong></div>
        </div>
      </div>

    </div>
    </div>

    
  );
};

export default Postulacion;
