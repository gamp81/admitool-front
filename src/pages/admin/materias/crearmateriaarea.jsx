import React,{ useEffect, useState } from "react";
import { useFormik } from "formik";
import { Dialog, DialogTitle,DialogContent } from "@mui/material";
import {MateriaAcademica} from '../../../pages/utils/validateForm';
function CrearMateriaArea({open,onClose,onProgramaCreated}) {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const [areas,setAreas]=useState([]);
    const[materias,setMaterias] = useState([]);
    useEffect(()=>{
        fetchData();
        fetchMateria();
      },[]);
      const fetchData = ()=>{
        fetch(`${apiUrl}KnowledgeArea/GetAll`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            /* "Authorization": `Bearer ${token}` */
          }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos al modal materia area: ",result.listData);
          
          setAreas(Object.values(result.listData)|| []);
          console.log("datos traidos : Object.values(result.listData)",Object.values(result.listData));
        }).catch(error=>console.log("Error al obtener los datos",error));
      }
      const fetchMateria = ()=>{
        fetch(`${apiUrl}Materium`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            /* "Authorization": `Bearer ${token}` */
          }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos al Materium : ",result);
          setMaterias(Object.values(result)|| []);
          //console.log("datos Materium : Object.values(result.listData)",Object.values(result.listData));
        }).catch(error=>console.log("Error al obtener los datos",error));
      }
    const formikMateriaArea = useFormik({
        initialValues:{
            materiaId: "",
            areaConocimientoId: ""
           
        },validationSchema:MateriaAcademica,
        onSubmit:(values)=>{
            const data = {...values};
            fetch(`${apiUrl}MateriaArea`,{
                method:'POST',
                headers:{
                  'Content-Type':'application/json' 
            },
            body: JSON.stringify(data)}
        ).then(response=>response.json())
        .then(result=>{
            console.log('resultado de res ',result);
            alert("Registro completado.");
            if (onProgramaCreated) {
                onProgramaCreated();
            }

            // Cerrar el modal
            onClose();
        })
        .catch(error=>{
            console.log(error);
          });
        }
    })
    return (  
        <Dialog className="col-5 mx-auto" open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Materia Area de Conocimiento</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={formikMateriaArea.handleSubmit}>
                        <label>
                            Nombre de Materia:
                            <select
                            name="materiaId"
                            value={formikMateriaArea.values.materiaId}
                            onChange={formikMateriaArea.handleChange}
                            onBlur={formikMateriaArea.handleBlur}>
                            
                            <option value="">Seleccione modalidad</option>
                            {materias.map((materia,index)=>(
                                <option key={index} value={materia.id}>
                                    {materia.nombre}</option>
                            ))}
                            
                            
                            </select>
                            {formikMateriaArea.touched.materiaId && formikMateriaArea.errors.materiaId && (
                                <div className="error">{formikMateriaArea.errors.materiaId}</div>
                                )}
                        </label>
                     
                        <label>
                            Area de Conocimiento:
                            <select
                            name="areaConocimientoId"
                            value={formikMateriaArea.values.areaConocimientoId}
                            onChange={formikMateriaArea.handleChange}
                            onBlur={formikMateriaArea.handleBlur}>
                            
                            <option value="">Seleccione modalidad</option>
                            {areas.map((area,index)=>(
                                <option key={index} value={area.id}>
                                    {area.name}</option>
                            ))}
                            
                            
                            </select>
                            {formikMateriaArea.touched.areaConocimientoId && formikMateriaArea.errors.areaConocimientoId && (
                                <div className="error">{formikMateriaArea.errors.areaConocimientoId}</div>
                                )}
                           
                        </label>
                        
                        <div className="form-buttons">
                            <button type="submit">REGISTRAR</button>
                        </div>
                    </form>
                </div>
            </DialogContent>

        </Dialog>
    );
}

export default CrearMateriaArea;