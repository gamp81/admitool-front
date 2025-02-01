import React, { useState } from "react";
import "../style/documentacion.css";

const Documentacion = () => {
  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setDocument(file ? file.name : null);
  };

  return (
    <div className="upload-form">
      <h2>Foto Carnet</h2>

      <div className="photo-section">
        <div className="upload-box">
            
          {photo ? (
            <img src={photo} alt="Preview" className="photo-preview" />
          ) : (
            <label htmlFor="photo-upload" className="upload-label">
              <span>Subir archivo</span>
              <input
                type="file"
                id="photo-upload"
                accept="image/jpeg, image/png"
                onChange={handlePhotoUpload}
              />
            </label>
          )}
        </div>
        <div className="recommendations">
          <h3>Recomendaciones:</h3>
          <ul>
            <li>Use un fondo uniforme, liso, blanco y libre de sombras.</li>
            <li>Realice la toma de forma frontal, con la cara directamente frente a la cámara.</li>
            <li>Recomendable una expresión facial neutra.</li>
            <li>Solo se aceptan imágenes en los formatos JPG o PNG.</li>
            <li>El formato de la imagen debe ser de 378x508 px.</li>
          </ul>
        </div>
      </div>

      <h2>Documentación Adicional</h2>
      <div className="document-section">
        <label htmlFor="document-upload" className="upload-label">
          {document ? (
            <span>{document}</span>
          ) : (
            <span>Arrastra y suelta tu archivo aquí o haz clic para subir</span>
          )}
          <input
            type="file"
            id="document-upload"
            accept="application/pdf"
            onChange={handleDocumentUpload}
          />
        </label>
      </div>

      <button className="submit-button" disabled={!photo || !document}>
        Continuar
      </button>
    </div>
  );
};

export default Documentacion;
