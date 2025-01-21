import React, { useState } from "react";
import "../style/Tabs.css";
import DatosPersonales from './datospersonales';
import '../style/Tabs.css';
const Faspirante = () => {
  const [activeTab, setActiveTab] = useState("datosPersonales");

  const renderContent = () => {
    switch (activeTab) {
      case "declaracion":
        return <div>Contenido de Declaración de Veracidad</div>;
      case "datosPersonales":
        return <div> <DatosPersonales></DatosPersonales></div>;
      case "informacionAcademica":
        return <div>Contenido de Información Académica</div>;
      case "documentacion":
        return <div>Contenido de Documentación</div>;
      case "contactoFamiliar":
        return <div>Contenido de Contacto Familiar</div>;
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      {/* Encabezado de las pestañas */}
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
  );
};

export default Faspirante;
