// PostulacionView.js
import React,{useContext} from "react";
import "../style/postulacion.css";
import { UserContext } from "../context/UserContext";

const Postulacion = () => {
  
  const { userData,postulanteData } = useContext(UserContext);
  const carreras = postulanteData
console.log ("carreras ",carreras);
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
        <div className="career">
          <div className="circle blue">1</div>
          <p>Electrónica y Automatización</p>
          <span>Preferencia</span>
        </div>
        <div className="career">
          <div className="circle blue">2</div>
          <p>Electricidad</p>
          <span>Preferencia</span>
        </div>
        <div className="career">
          <div className="circle blue">3</div>
          <p>Telecomunicaciones</p>
          <span>Preferencia</span>
        </div>
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
