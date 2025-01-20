import React, {useState, useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import DatosPersonales from './datospersonales';
import '../style/datospersonales.css';
function Faspirante() {
  const [key, setKey] = useState('pestaña1');

  return (
    <div className='container'>
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
            ><p><b>Para su conocimiento:</b> 
                <li>Usted debe actualizar obligatoriamente toda información que se solicite en cada una de las secciones.</li>
                <li>Omitir o falsear los datos expone al estudiante a sanciones</li>
              </p>
            </Alert>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            >
            <Tab eventKey="pestaña1" title="DECLARACION DE VERACIDAD">
            Contenido de la Pestaña 1
            </Tab>
            <Tab eventKey="pestaña2" title="DATOS PERSONALES">
               <DatosPersonales></DatosPersonales>
            </Tab>
            <Tab eventKey="pestaña3" title="INFORMACION ACADEMICA">
                Contenido de la Pestaña 3
            </Tab>
            <Tab eventKey="pestaña4" title="DOCUMENTACION">
                Contenido de la Pestaña 4
            </Tab>
            <Tab eventKey="pestaña5" title="CONTACTO FAMILIAR">
                Contenido de la Pestaña 5
            </Tab>
        </Tabs>
      
    </div>
   
  );
}

export default Faspirante;