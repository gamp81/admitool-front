import React, { useState } from "react";
import "../style/fichatabs.css";

const TabsSecuenciales = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTabValidated, setIsTabValidated] = useState([false, false, false]);

  const validateTab = (tabIndex) => {
    // Aquí puedes añadir la lógica de validación de cada pestaña
    if (tabIndex === 0) {
      // Simulación de validación de la primera pestaña
      const isValid = true; // Cambiar por la lógica de validación
      if (isValid) {
        const updatedValidation = [...isTabValidated];
        updatedValidation[tabIndex] = true;
        setIsTabValidated(updatedValidation);
        setActiveTab(tabIndex + 1);
      } else {
        alert("Por favor, complete todos los campos requeridos antes de continuar.");
      }
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 0 ? "active" : ""}`}
          disabled={false}
          onClick={() => setActiveTab(0)}
        >
          Datos Personales
        </button>
        <button
          className={`tab-button ${activeTab === 1 ? "active" : ""}`}
          disabled={!isTabValidated[0]}
          onClick={() => setActiveTab(1)}
        >
          Información Académica
        </button>
        <button
          className={`tab-button ${activeTab === 2 ? "active" : ""}`}
          disabled={!isTabValidated[1]}
          onClick={() => setActiveTab(2)}
        >
          Documentación
        </button>
      </div>

      <div className="tabs-content">
        {activeTab === 0 && (
          <div>
            <h2>Datos Personales</h2>
            <form>
              <label>*Nombres:</label>
              <input type="text" required />
              <label>*Apellidos:</label>
              <input type="text" required />
              <button
                type="button"
                className="validate-button"
                onClick={() => validateTab(0)}
              >
                Validar y Continuar
              </button>
            </form>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h2>Información Académica</h2>
            <form>
              <label>*Título:</label>
              <input type="text" required />
              <label>*Universidad:</label>
              <input type="text" required />
              <button
                type="button"
                className="validate-button"
                onClick={() => validateTab(1)}
              >
                Validar y Continuar
              </button>
            </form>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <h2>Documentación</h2>
            <form>
              <label>*Cargar documento:</label>
              <input type="file" required />
              <button
                type="button"
                className="validate-button"
                onClick={() => alert("Formulario completado.")}
              >
                Finalizar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsSecuenciales;
