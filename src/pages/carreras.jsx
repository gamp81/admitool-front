import React, {useState, useEffect} from 'react'
import { arraycarreras } from "../data/datos";
import "../style/carreras.css";
import Alert from '@mui/material/Alert';
//import InfoIcon from '@mui/icons-material/Info';


export default function Carrera() {
    const [checkedState, setCheckedState] = useState(
        new Array(arraycarreras.length).fill(false)
      );
    
      const [total, setTotal] = useState(0);
    
      const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
    
      
    
       
      };
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
          icon: 'ruta-del-icono-2.png',
          items: ['Computación', 'Logística y Transporte', 'Matemática', 'Mecatrónica','Telemática'],
        },
        {
          title: 'ARTE',
          color: '#e83e8c',
          icon: 'ruta-del-icono-3.png',
          items: ['Diseño de Productos', 'Producción Medios de Comunicación', 'Diseño Gráfico'],
        },
        {
          title: 'EDUCACIÓN COMERCIAL',
          color: '#e83e8c',
          icon: 'ruta-del-icono-3.png',
          items: ['Administración de Empresas', 'Auditoria y control de gestión', 'Economía'],
        },
        {
          title: 'INGENIERÍAS APLICADAS GRUPO II',
          color: '#e83e8c',
          icon: 'ruta-del-icono-3.png',
          items: ['Administración de Empresas', 'Auditoria y control de gestión', 'Economía'],
        },


      ];
      // Filtrar la primera sección
        const firstSection = sections.find(section => section.title === 'CIENCIAS E INGENIERÍAS');
       // Filtrar todas las secciones excepto la primera
            const otherSections = sections.filter((_, index) => index !== 0);
      return (
        <div className="container">
        <Alert
      //icon={<InfoIcon fontSize="inherit" />}
      severity="info"
      sx={{
        backgroundColor: '#e0f7fa', // Fondo celeste
        color: '#00796b', // Color del texto
        '& .MuiAlert-icon': {
          color: '#00796b', // Color del ícono
        },
      }}
    ><p><b>Información importante:</b> Podrás selección hasta tres carreras de una misma subárea de conocimiento durante esta etapa de inscripción. Las pruebas de conocimiento que rindas durante la etapa de evaluación de competencias y capacidades dependerán del perfil de evaluación de la carrera seleccionada. 
    Puedes obtener mas información sobre el perfil de evaluación y la oferta académica en el siguiente enlace: <a href='https://www.registrounicoedusup.gob.ec/'>bit.ly/4fknpa0</a>.
      </p>
    </Alert>
  
        <div className="table-container">
          <div className="header">
            <div className="icon">
              {/* Coloca aquí un ícono si tienes uno */}
              <img src="ruta-del-icono.png" alt="icono" />
            </div>
            <h3 className="title">CIENCIAS E INGENIERÍAS</h3>
          </div>
          <div className="grid">
            {firstSection.items.map((item, index) => (
              <label key={index} className="grid-item">
              <input type="checkbox" />
                {item}
              </label>
            ))}
          </div>
     
        </div>
        <div className="sections-container">
          {otherSections.map((section, index) => (
          <div key={index} className="section" style={{ borderColor: section.color }}>
            <div className="header">
              <div className="icon" style={{ backgroundColor: section.color }}>
                <img src={section.icon} alt="icono" />
              </div>
              <h3 className="title" style={{ color: section.color }}>
                {section.title}
              </h3>
            </div>
            <div className="grid2">
              {section.items.map((item, idx) => (
              <label key={idx} className="grid-item">
                <input type="checkbox" />
                {item}
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
