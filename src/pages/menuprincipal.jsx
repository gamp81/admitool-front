import React, { useState } from "react";
import "../style/menuprincipal.css";

import {  Nav  } from "react-bootstrap"
import {  Link } from "react-router-dom"
import CardMenu from '../components/cardMenu';

const Menuprincipal = () => {


  return (
     <div className="container">
        <p className="message">
          Estimado aspirante, se necesita que primero actualice sus datos para que
          pueda proceder a inscribirse.
        </p>
        <div className="card-container">
          <Nav.Link  as={Link} to="/faspirante"><CardMenu icon="🔄" text="ACT. DATOS" color="#4a90e2"/></Nav.Link>
          <Nav.Link  as={Link} to="/inscripcion"><CardMenu icon="📝" text="INSCRIPCIÓN" color="#f5a623" /></Nav.Link>
          <Nav.Link  as={Link} to="/postulacion"><CardMenu icon="📋" text="POSTULACIÓN" color="#f5a623" /></Nav.Link>
          {/* <Nav.Link  as={Link} to="/matriculacion" disabled><CardMenu icon="📅" text="MATRICULACIÓN" color="#f5a623" /></Nav.Link> */}
          <Nav.Link  as={Link} to="/aceptacion"><CardMenu icon="✅" text="ACEPTACION" color="#f5a623" /></Nav.Link>
        </div>
      </div>
     
  );
};

export default Menuprincipal;
