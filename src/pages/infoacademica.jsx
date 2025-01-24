import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import "../style/infoacademica.css";
import { arraycolegios } from '../data/colegios';
const InfoAcademica = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };
    return (
        <>
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
          ><p>Estimado aspirante, por favor seleccione el colegio de su precedencia. Si tu colegio no se encuentra en la lista, 
            por favor llena el siguiente formulario:https://forms.gle/DzK5KunE1rCbGRvf9</p>
          </Alert>
          <div>
          <label>Seleccione el colegio</label>
          <select id="arraycolegios" value={selectedOption} onChange={handleChange}>
                <option value="" disabled>
                -- Selecciona --
                </option>
                {arraycolegios.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.value}
                </option>
                ))}
            </select>
        </div>
        <button className="submit-button">Guardar y Continuar →</button>
          </div>
        </>
    );
}

export default InfoAcademica;