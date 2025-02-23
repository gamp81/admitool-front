import React,{ useEffect, useState } from "react";
import { useFormik } from "formik";
import { Dialog, DialogTitle,DialogContent } from "@mui/material";
import {ProgramaAcademico} from '../../../pages/utils/validateForm';
function CrearPrograma({open,onClose,onProgramaCreated}) {
    const [areas,setAreas]=useState([]);
    useEffect(()=>{
        fetchData();
      },[]);
      const fetchData = ()=>{
        fetch("https://localhost:7016/api/KnowledgeArea/GetAll",{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            /* "Authorization": `Bearer ${token}` */
          }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos al modal : ",result.listData);
          
          setAreas(Object.values(result.listData)|| []);
          console.log("datos traidos : Object.values(result.listData)",Object.values(result.listData));
        }).catch(error=>console.log("Error al obtener los datos",error));
      }
    
    const formikPrograma = useFormik({
        initialValues:{
            nombre:"",
            descripcion:"",
            areaId:"",
            modalidad:""
        },validationSchema:ProgramaAcademico,
        onSubmit:(values)=>{
            const data = {...values};
            fetch("https://localhost:7016/api/Career/Create",{
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
        <Dialog className="col-4 mx-auto" open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Programa Academico</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={formikPrograma.handleSubmit}>
                        <label>
                            Nombre del Programa:
                            <input type="text" name="nombre"
                            value={formikPrograma.values.nombre}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.nombre && formikPrograma.errors.nombre && (
                                <div className="error">{formikPrograma.errors.nombre}</div>
                                )}
                        </label>
                        <label>
                            Descripçion del Programa:
                            <input type="text" name="descripcion"
                            value={formikPrograma.values.descripcion}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.descripcion && formikPrograma.errors.descripcion && (
                                <div className="error">{formikPrograma.errors.descripcion}</div>
                                )}
                        </label>
                        <label>
                            Area de Conocimiento:
                            <select
                            name="areaId"
                            value={formikPrograma.values.areaId}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione modalidad</option>
                            {areas.map((area,index)=>(
                                <option key={index} value={area.id}>
                                    {area.name}</option>
                            ))}
                            
                            
                            </select>
                            {formikPrograma.touched.areaId && formikPrograma.errors.areaId && (
                                <div className="error">{formikPrograma.errors.areaId}</div>
                                )}
                           
                        </label>
                        <label>
                            Modalidad:
                            <select
                            name="modalidad"
                            value={formikPrograma.values.modalidad}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione modalidad</option>
                            <option value="PRESENCIAL">Presencial</option>
                            <option value="HIBRIDA">Hibrida</option>
                            <option value="VIRTUAL">Virtual</option>
                            </select>
                            {formikPrograma.touched.modalidad && formikPrograma.errors.modalidad && (
                                <div className="error">{formikPrograma.errors.modalidad}</div>
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

export default CrearPrograma;