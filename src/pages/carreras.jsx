import React, {useState, useEffect,useContext} from 'react'

import "../style/carreras.css";
import Alert from '@mui/material/Alert';
import { AuthContext } from '../context/AuthContext';
import { MdOutlineEngineering } from "react-icons/md";
import { GrCloudComputer } from "react-icons/gr";
import { PiPaintBrushFill } from "react-icons/pi";
import { MdOutlineScience } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
//import InfoIcon from '@mui/icons-material/Info';
import CatalogoService from '../services/CatalogoService';

export default function Carrera() {
 
  const [data,setData] = useState(null)
   
      const sections = [
        {
            title: 'CIENCIAS E INGENIERÍAS',
            color: '#007bff',
            icon: 'ruta-del-icono-1.png',
            items: [
                'Acuicultura',
                'Alimentos',
                'Electricidad',
                'Electrónica y Automatización',
                'Geología',
                'Ingeniería Civil',
                'Ingeniería Industrial',
                'Ingeniería Naval',
                'Ingeniería Química',
                'Materiales',
                'Mecánica',
                'Minas',
                'Oceanografía',
                'Petróleos',
                'Telecomunicaciones',
              ],
          },
        {
          title: 'CIENCIAS E INGENIERÍAS APLICADAS GRUPO I',
          color: '#007bff',
          icon: <GrCloudComputer/>,
          items: ['Computación', 'Logística y Transporte', 'Matemática', 'Mecatrónica','Telemática'],
        },
        {
          title: 'ARTE',
          color: '#e83e8c',
          icon: <PiPaintBrushFill/>,
          items: ['Diseño de Productos', 'Producción Medios de Comunicación', 'Diseño Gráfico'],
        },
        {
          title: 'EDUCACIÓN COMERCIAL',
          color: '#e83e8c',
          icon: <MdOutlineManageAccounts/>,
          items: ['Administración de Empresas', 'Auditoria y control de gestión', 'Economía'],
        },
        {
          title: 'INGENIERÍAS APLICADAS GRUPO II',
          color: '#e83e8c',
          icon: <MdOutlineScience/>,
          items: ['Administración de Empresas', 'Auditoria y control de gestión', 'Economía'],
        },


      ];
      useEffect(() => {
        fetch("https://localhost:7198/api/Postulation/GetKnowledgeArea", {
          method: 'GET',
        })
        .then(response => response.json())
        .then(result => {
          console.log("traido del api ", result);
          setData(result);
        })
        .catch(error => {
          console.log("Error al obtener los datos:", error);
        })
        .finally(() => {
          console.log("final del api stop");
        });
      }, []); // <- Dependencia vacía para que solo se ejecute una vez
      console.log("traido del api fuera",data);
      //console.log("traido del api obtenerAreasConocimiento",CatalogoService.obtenerAreasConocimiento());
      

      // Filtrar la primera sección
        const firstSection = sections.find(section => section.title === 'CIENCIAS E INGENIERÍAS');
        const firstSection1 = data?.find(section => section.name === 'CIENCIAS E INGENIERÍAS');
        //console.log("traido del firstSection1",firstSection1);
        // Filtrar todas las secciones excepto la primera
            const otherSections = sections.filter((_, index) => index !== 0);
            const otherSections1 = data?.filter((_, index) => index !== 0);
            //console.log("traido del otherSections1",otherSections1);
      return (
        <div className="container">
       {/*  <Alert
          //icon={<InfoIcon fontSize="inherit" />}
          severity="info"
          sx={{
            backgroundColor: '#e0f7fa', // Fondo celeste
            color: '#00796b', // Color del texto
            '& .MuiAlert-icon': {
              color: '#00796b', // Color del ícono
            },
      }}
    > */}
      <p><b>Información importante:</b> Podrás selección hasta tres carreras de una misma subárea de conocimiento durante esta etapa de inscripción. Las pruebas de conocimiento que rindas durante la etapa de evaluación de competencias y capacidades dependerán del perfil de evaluación de la carrera seleccionada. 
    Puedes obtener mas información sobre el perfil de evaluación y la oferta académica en el siguiente enlace: <a href='https://www.registrounicoedusup.gob.ec/'>bit.ly/4fknpa0</a>.
      </p>
   {/*  </Alert> */}
  
        <div className="table-container">
          <div className="header">
            <div className="icon">
              {/* Coloca aquí un ícono si tienes uno */}
             {/*  <img src="ruta-del-icono.png" alt="icono" /> */}
             <MdOutlineEngineering />
            </div>
            <h3 className="title">CIENCIAS E INGENIERÍAS</h3>
          </div>
          <div className="grid">
            {firstSection1?.professionalCareers.map((item, index) => (
                <label key={index} className="grid-item">
                <input type="checkbox" />
                  {item.name}
                </label>
              ))} 

          </div>
     
        </div>
        <div className="sections-container">
          {otherSections1?.map((section, index) => (
          <div key={index} className="section" style={{ borderColor: section.color }}>
            <div className="header">
              <div className="icon" style={{ backgroundColor: section.color }}>
                {section.icon} 
              </div>
              <h3 className="title" style={{ color: section.color }}>
                {section.name}
              </h3>
            </div>
            <div className="grid2">
             {section.professionalCareers.map((item, idx) => (
              <label key={idx} className="grid-item">
                <input type="checkbox" />
                {item.name}
              </label>
              ))} 
            </div>
          </div>
      ))}
      </div>
      <div className="containerbutton">
      <button className="button">
        Aceptar
      </button>
      </div>
      </div>
      );
}
