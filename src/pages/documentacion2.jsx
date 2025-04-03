import { useState,useContext,useEffect } from "react";
import '../style/documentacion.css';
import { UserContext } from '../context/UserContext';
import { AuthContext } from "../context/AuthContext";
export default function Documentacion() {
  const apiUrl = process.env.REACT_APP_API_URL ;
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState("");
  const {userData} = useContext(UserContext);
  const { token} = useContext(AuthContext);

   useEffect(() => {
      if (!token || !userData?.documentos?.length) return; // Evita hacer la petición si token es null o undefined
  
      const fetchData = async (index, setFile) => {
        if (!userData.documentos[index]) return;
          try {
              console.log("El componente se ha renderizado",userData.documentos[1].nombre );
              const response = await fetch(`${apiUrl}PostulantFile/GetData?fileName=${userData.documentos[1].nombre}`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                  }
              });
  
              if (!response.ok) {
                  throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
  
              const result = await response.json();
              console.log("Datos obtenidos result.data: ", result);
              // Convertir `byteArray` en URL para visualizar la imagen/PDF
              const blob = new Blob([new Uint8Array(result.byteArray)], { type: index === 0 ? "image/jpeg" : "application/pdf" });
              const url = URL.createObjectURL(blob);
              setFile(url);
          } catch (error) {
              console.error("Error al obtener los datos:", error);
          }
      };
      
        fetchData(1, setPdf);   // Obtener PDF
        fetchData(0, setImage); // Obtener imagen
    /*   const fetchData2 = async () => {
        try {
            console.log("El componente se ha renderizado",userData.documentos[1].nombre );
            const response = await fetch(`${apiUrl}PostulantFile/GetData?fileName=${userData.documentos[0].nombre}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Datos obtenidos result.data: ", result);
            setImage(result.byteArray);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    }; */
      /* 
      fetchData2(); */
      }, [token, userData, apiUrl]);
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (type === "image" && !["image/png", "image/jpeg"].includes(file.type)) {
      setError("Solo se permiten imágenes PNG o JPEG");
      return;
    }
    if (type === "pdf" && file.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF");
      return;
    }
    
    setError("");
    //type === "image" ? setImage(file) : setPdf(file);
    type === "image" ? setImage(URL.createObjectURL(file)) : setPdf(URL.createObjectURL(file));
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
      const response = await fetch(`${apiUrl}PostulantFile/UploadDocument`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert("Documentación guardada con exito ");
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
                {/* {image ? ( <img src={image} alt="Preview" className="photo-preview" />) : ( 
                <label className="upload-label">Subir archivo
                <input type="file" id="photo-upload" accept="image/jpeg, image/png" onChange={(e) => handleFileChange(e, "image")} />
                </label>
                )} */}
                {image ? (
                  <img src={image} alt="Preview" className="photo-preview" />
                ) : (
                  <label className="upload-label">
                    Subir imagen
                    <input type="file" accept="image/jpeg, image/png" onChange={(e) => handleFileChange(e, "image")} />
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
            {/* <label htmlFor="document-upload" className="upload-label">
            {pdf ? (<span>{pdf.name}</span> ) : ( <span>Arrastra y suelta tu archivo aquí o haz clic para subir</span> )}
            <input id="document-upload" type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "pdf")}/>
          </label> */}
          {pdf ? (
            <embed src={pdf} type="application/pdf" width="100%" height="300px" />
          ) : (
            <label htmlFor="document-upload" className="upload-label">
              <span>Arrastra y suelta tu archivo aquí o haz clic para subir</span>
              <input id="document-upload" type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "pdf")} />
            </label>
          )}
          
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Subir</button>
      </form>
    </div>
  );
}

