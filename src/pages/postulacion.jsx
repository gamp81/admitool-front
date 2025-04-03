// PostulacionView.js
import React,{useContext,useState,useEffect} from "react";
import "../style/postulacion.css";
import { UserContext } from '../context/UserContext';
import { AuthContext } from "../context/AuthContext";
import { useFormik } from 'formik';
import {useNavigate} from "react-router-dom"
const Postulacion = () => {
    const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL ;
  const { token} = useContext(AuthContext); // Obtiene los datos del usuario autenticado
  const {userData} = useContext(UserContext);
  const [ postulanteData, setPostulanteData] = useState(null);
  const [careers,setCareers] = useState([]);
  const [carerras,setCarerras] = useState([]);
  const [orden,setOrden] = useState([]);
  const [puntaje,setPuntaje] = useState([]);

  useEffect(() => {
    if (!token) return; // Evita hacer la petición si token es null o undefined

    const fetchData = async () => {
        try {
            console.log("El componente se ha renderizado");
            const response = await fetch(`${apiUrl}Postulation/GetLastInscription`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Datos obtenidos result.data: ", result.data);
            setPostulanteData(result.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    fetchData();
    }, [token,apiUrl]); // Agregamos token como dependencia

    useEffect(() => {
      console.log("Datos actualizados postulanteData:", postulanteData);
      setCarerras(postulanteData?.careerResponses);
      setCareers(postulanteData?.careerResponses.map(c => c.careerName));
      setOrden(postulanteData?.dataGroup)
      //setPuntaje(postulanteData?.dataPoints) 
      setPuntaje(postulanteData?.dataPoints.map(c => [c.nombre, c.total])) 
    }, [postulanteData]); // Este useEffect se ejecuta cuando postulanteData cambia
    useEffect(() => { console.log("Datos obtenidos setCareers: ",careers);
      },[careers]);
    useEffect(() => {
      console.log("Datos obtenidos orden: ",orden);
    },[orden]);
    useEffect(()=>{
      console.log("Datos obtenidos puntaje: ",puntaje);
      //console.log("total ",puntaje?.[0][1]);
    },[puntaje]);
   
  const FormikPostulacion = useFormik ({
    initialValues:{
      postulanteId:"",
      areaId:"",
      options:careers
    },
    onSubmit:(values)=>{
      const allData={...values,postulanteId:userData.id,areaId:postulanteData.areaId,
        options: carerras};
      fetch(`${apiUrl}Postulation/SavePostulation`,{
        method: 'POST',
        headers:{ 'Content-Type':'application/json', "Authorization": `Bearer ${token}`},
        body:JSON.stringify(allData)
      }).then(response=>{
        console.log('resultado',response);
       alert("Registro completado.");
       navigate("/menu");
      })
      .catch(error=>{
        console.log(error);
      });   
    }
  })

  return (
    <div className="postulacion-container">
      <h2 className="title">Postulación</h2>
      <div className="">
        <h2 className="subtitle">Datos Personales</h2>
        <div className="field-group">
          <label>Nombres:</label>
          <span>{userData?.nombres} {userData?.apellidos}</span>
         
        </div>
        <div className="field-group">
          <label>Identificación:</label>
          <span>{userData?.identificacion}</span>
        </div>
        <div className="field-group">
          <label>Correo:</label>
          <span>{userData?.email}</span>
        </div>
      </div>

      <form onSubmit={FormikPostulacion.handleSubmit}>
        <div className="career-selection-container">
          <h2 className="section-title">Carreras Elegidas</h2>
          <div className="careers">
          {careers?.map((career, index) => (
            
            <div className="career">
              <div className="circle blue">{index+1}</div>
              <p key={index}>{career}</p>
              <span>Preferencia</span>
            </div>))}
           
          </div>

          <button className="change-career-button">Cambiar Carrera</button>

          <h2 className="section-title">Orden de Asignación</h2>
          <div className="assignment-groups">
            <div className="group">
              <div className="circle green">1</div>
              <p>Grupo de mayor vulnerabilidad socioeconómica</p>
              <div className={orden?.grupoVulnerable ? "status-check" : "status-cross" }> {orden?.grupoVulnerable ? "✔" : "✘" } </div>
            </div>
            <div className="group">
              <div className="circle teal">2</div>
              <p>Grupo de Mérito Académico</p>
              <div className={orden?.grupoMeritoAcademico ? "status-check" : "status-cross" }>{orden?.grupoMeritoAcademico ? "✔" : "✘" }</div>
            </div>
            <div className="group">
              <div className="circle purple">3</div>
              <p>Bachiller de último período académico</p>
              <div className={orden?.grupoUltimoBachiller ? "status-check" : "status-cross" }>{orden?.grupoUltimoBachiller ? "✔" : "✘" }</div>
            </div>
            <div className="group">
              <div className="circle orange">4</div>
              <p>Población general</p>
              <div className={orden?.grupoGeneral ? "status-check" : "status-cross" }>{orden?.grupoGeneral ? "✔" : "✘" }</div>
            </div>
          </div>
          <div className="container">
            <h2 className="subtitle">Política de Acción Afirmativa</h2>
            <div  class="row g-3 affirmative-policy ">
                {postulanteData?.dataPoints.map((item, index) => (
                  <div key={index} >
                    <strong>{item.nombre}:</strong> {item.total}
                  </div>
                ))}
             
            </div>
            
          </div>
          <button type="submit" className="submit-button">Guardar→</button>
        </div>
      </form>
      

    
    </div>

    
  );
};

export default Postulacion;
