import React from "react";
import "../../style/menuprincipal.css";

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
const MenuAdmin = () => {


  return (
    <>
      <div className="container">
        
        <div className="card-container">
          <Nav.Link  as={Link} to="/AdminAreaLista"><Card icon="🔄" text="AREAS DE CONOCIMIENTO" color="#4a90e2"/></Nav.Link>
          <Nav.Link  as={Link} to="/AdminProgramas"><Card icon="📋" text="PROGRAMA ACADEMICO" color="#f5a623" /></Nav.Link>
          <Nav.Link  as={Link} to="/AdminPeriodos"><Card icon="📝" text="PERIODOS" color="#f5a623" /></Nav.Link>
          <Nav.Link  as={Link} to="/AdminCursos" ><Card icon="✅" text="CURSOS" color="#f5a623" /></Nav.Link>
          <Nav.Link  as={Link} to="/AdminMaterias" ><Card icon="📅" text="MATERIAS" color="#f5a623" /></Nav.Link>
          <Nav.Link  as={Link} to="/AdminAsignacion" ><Card icon="🔑​" text="ASIGNACION" color="#f5a623" /></Nav.Link>
          
        </div>
      </div>
      
   
    </>
  );
};

export default MenuAdmin;
