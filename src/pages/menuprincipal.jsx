import React, { useState } from "react";
import "../style/menuprincipal.css";

import {  Nav  } from "react-bootstrap"
import {  Link } from "react-router-dom"


const Card = ({ icon, text, color }) => {
  return (
    <div className="card" style={{ borderColor: color }}>
      <div className="icon" style={{ color: color }}>
        {icon}
      </div>
      <p className="text">{text}</p>
    </div>
  );
};
const Menuprincipal = () => {


  return (
     <div className="container">
        <p className="message">
          Estimado aspirante, se necesita que primero actualice sus datos para que
          pueda proceder a inscribirse.
        </p>
        <div className="card-container">
          <Nav.Link  as={Link} to="/faspirante"><Card icon="🔄" text="ACT. DATOS" color="#4a90e2"/></Nav.Link>
          <Nav.Link  as={Link} to="/inscripcion"><Card icon="📝" text="INSCRIPCIÓN" color="#f5a623" /></Nav.Link>
          <Nav.Link  as={Link} to="/postulacion"><Card icon="📋" text="POSTULACIÓN" color="#f5a623" /></Nav.Link>
          <Nav.Link  as={Link} to="/matriculacion" disabled><Card icon="📅" text="MATRICULACIÓN" color="#f5a623" /></Nav.Link>
          <Nav.Link  as={Link} to="/aceptacion"><Card icon="✅" text="ACEPTACION" color="#f5a623" /></Nav.Link>
        </div>
      </div>
     
  );
};

export default Menuprincipal;
