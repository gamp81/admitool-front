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

import CareerSelectionModal from '../components/CareerSelectionModal';

import { useNavigate } from 'react-router-dom';

export default function Carrera() {
  const { user,token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [selectedCareers, setSelectedCareers] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState(null); // Área de conocimiento seleccionada
  const [nameArea, setNameArea] = useState(null); 
  const [openModal, setOpenModal] = useState(false);
 
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Enviando token:", token);
    fetch("https://localhost:7198/api/Inscription/GetKnowledgeArea", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Se agrega el token en el encabezado
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log("obtener los datos:", result)
        setData(result)})
      .catch(error => console.log("Error al obtener los datos:", error));
  }, []);

  const handleCheckboxChange = (careerId, areaId,careerName,areaName) => {
    setSelectedCareers((prev) => {
      if (prev.some(career => career.careerId === careerId)) {
        const newSelection = prev.filter(career => career.careerId !== careerId);
        if (newSelection.length === 0) {
          setSelectedAreaId(null); // Si se desmarca todo, permitir otra área
        }
        return newSelection;
      } else if (prev.length < 3 && (selectedAreaId === null || selectedAreaId === areaId)) {
        setSelectedAreaId(areaId);
        setNameArea(areaName);
        return [...prev, { careerId, order: prev.length + 1, careerName }];
      }
      return prev;
    });
  };

  const handleSubmit = async () => {
    if (selectedCareers.length === 0) {
      alert("Debes seleccionar al menos una carrera.");
      return;
    }

    const payload = {
      PostulanteId: parseInt(user?.usrId) || 0,
      areaId: selectedAreaId,
      options: selectedCareers
    };

    console.log("Enviando datos:", payload);
    
    try {
      const response = await fetch("https://localhost:7198/api/Inscription/SaveApplication", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json(); 
    
        console.log("listData:", data.listData); // Mostrar listData en consola
        alert("Selección enviada con éxito.");
        
        navigate("/inscripcionend",{state:{careers:selectedCareers,areaId: selectedAreaId, area:nameArea,lista:data.listData,registrationId:data.id }})

      } else {
        alert("Error al enviar la selección.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error de conexión.");
    }
  };

      return (
        <div className="container">
        <p>
          <b>Información importante:</b> Puedes seleccionar hasta tres carreras de una misma área de conocimiento.  
          <a href="https://www.registrounicoedusup.gob.ec/"> Más información aquí.</a>
        </p>
  
        {/* Secciones */}
        <div className="sections-container">
          {data?.map((section, index) => (
            <div key={index} className="section" style={{ borderColor: section.color }}>
              <div className="header">
                <div className="icon" style={{ backgroundColor: section.color }}>
                  {section.name === "CIENCIAS E INGENIERÍAS" ? <MdOutlineScience /> : 
                  section.name === "CIENCIAS E INGENIERÍAS APLICADAS GRUPO I" ? <MdOutlineEngineering /> : 
                  section.name === "ARTE" ? <PiPaintBrushFill />:
                  section.name === "EDUCACION COMERCIAL" ? <MdOutlineManageAccounts/> :
                  section.name === "CIENCIAS E INGENIERÍAS APLICADAS GRUPO II" ? <GrCloudComputer /> :  <GrCloudComputer />}
                </div>
                <h3 className="title" >{section.name}</h3>
              </div>
              <div className="grid2">
                {section.professionalCareers.map((item, idx) => (
                  <label key={idx} className="grid-item">
                    <input
                      type="checkbox"
                      checked={selectedCareers.some(career => career.careerId === item.id)}
                      onChange={() => handleCheckboxChange(item.id, section.id,item.name,section.name)}
                      disabled={
                        (selectedCareers.length >= 3 && !selectedCareers.some(career => career.careerId === item.id)) ||
                        (selectedAreaId !== null && selectedAreaId !== section.id)
                      }
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        {/* Botón de Aceptar */}
        <div className="containerbutton">
         {/*  <button className="button" disabled={selectedCareers.length === 0} onClick={handleSubmit}>
            Aceptar ({selectedCareers.length}/3 seleccionadas)
          </button> */}
           {/* Botón para abrir el modal */}
      <button className="button" onClick={() => setOpenModal(true)}>
        Aceptar
      </button>

      {/* Modal para definir prioridades */}
      <CareerSelectionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedCareers={selectedCareers}
        setSelectedCareers={setSelectedCareers}
        onSubmit={handleSubmit}
      />
          
        </div>
      </div>
      );
}
