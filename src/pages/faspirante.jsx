import React, { useState } from "react";
import "../style/Tabs.css";
import DatosPersonales from './datospersonales';
import Declaracion from "../components/declaracion";
import Documentacion from "./documentacion2";
import '../style/Tabs.css';
import Alert from '@mui/material/Alert';
import InfoAcademica from "./infoacademica";
import ContactFamily from "../components/contactFamily";
const Faspirante = () => {
  const [activeTab, setActiveTab] = useState("declaracion");

  const renderContent = () => {
    switch (activeTab) {
      case "declaracion":
        return <div><Declaracion/> </div>;
      case "datosPersonales":
        return <div> <DatosPersonales></DatosPersonales></div>;
      case "informacionAcademica":
        return <InfoAcademica></InfoAcademica>;
      case "documentacion":
        return <Documentacion></Documentacion>;
      case "contactoFamiliar":
        return <div><ContactFamily></ContactFamily></div>;
      default:
        return null;
    }
  };

  return (
    <>

    <div className="container">
      {/* Encabezado de las pestañas */}
      <Alert className="message"
              //icon={<InfoIcon fontSize="inherit" />}
              severity="info"
              sx={{
                backgroundColor: '#e0f7fa', // Fondo celeste
                color: '#00796b', // Color del texto
                '& .MuiAlert-icon': {
                  color: '#00796b', // Color del ícono
                },
              }}
            ><p><b>Para su conocimiento:</b> 
                <li>Usted debe actualizar obligatoriamente toda información que se solicite en cada una de las secciones.</li>
                <li>Omitir o falsear los datos expone al estudiante a sanciones</li>
              </p>
            </Alert>
      <div className="tabs-header">
        <button
          className={activeTab === "declaracion" ? "active" : ""}
          onClick={() => setActiveTab("declaracion")}
        >
          DECLARACIÓN DE VERACIDAD
        </button>
        <button
          className={activeTab === "datosPersonales" ? "active" : ""}
          onClick={() => setActiveTab("datosPersonales")}
        >
          DATOS PERSONALES
        </button>
        <button
          className={activeTab === "informacionAcademica" ? "active" : ""}
          onClick={() => setActiveTab("informacionAcademica")}
        >
          INFORMACIÓN ACADÉMICA
        </button>
        <button
          className={activeTab === "documentacion" ? "active" : ""}
          onClick={() => setActiveTab("documentacion")}
        >
          DOCUMENTACIÓN
        </button>
        <button
          className={activeTab === "contactoFamiliar" ? "active" : ""}
          onClick={() => setActiveTab("contactoFamiliar")}
        >
          CONTACTO FAMILIAR
        </button>
      </div>

      {/* Contenido dinámico basado en la pestaña activa */}
      <div className="tabs-content">{renderContent()}</div>
    </div>
    </>
  );
};

export default Faspirante;
