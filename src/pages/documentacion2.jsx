import { useState,useContext } from "react";
import '../style/documentacion.css';
import { UserContext } from '../context/UserContext';

export default function Documentacion() {
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState("");
  const {userData} = useContext(UserContext);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (type === "image" && file.type !== "image/png" && file.type !== "image/jpeg") {
      setError("Solo se permiten imágenes PNG o JPEG");
      return;
    }
    if (type === "pdf" && file.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF");
      return;
    }
    
    setError("");
    type === "image" ? setImage(file) : setPdf(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image || !pdf) {
      setError("Debes subir ambos archivos");
      return;
    }
    
    const formData = new FormData();
    formData.append("PostulantId",userData.id)
    formData.append("image", image);
    formData.append("document", pdf);
    console.log(" enviando",formData)
    try {
      const response = await fetch("https://localhost:7198/api/PostulantFile/UploadDocument", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
        console.error("Error al subir los archivos:", error);
      setError("Error al subir los archivos");
    }
  };

  return (
    <div className="upload-form">
      <h2 className="text-lg font-bold mb-2">Foto Carnet</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="photo-section">
            <div className="upload-box">
                {image ? ( <img src={image} alt="Preview" className="photo-preview" />) : ( 
                <label className="upload-label">Subir archivo
                <input type="file" id="photo-upload" accept="image/jpeg, image/png" onChange={(e) => handleFileChange(e, "image")} />
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
            {pdf ? (<span>{pdf.name}</span> ) : ( <span>Arrastra y suelta tu archivo aquí o haz clic para subir</span> )}
            <input id="document-upload" type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "pdf")} />
          </label>
          
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Subir</button>
      </form>
    </div>
  );
}

