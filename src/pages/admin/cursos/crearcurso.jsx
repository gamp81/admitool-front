import React,{ useEffect, useState } from "react";
import { useFormik } from "formik";
import { Dialog, DialogTitle,DialogContent } from "@mui/material";
import {valiCurso} from '../../utils/validateForm';
function CrearCurso({open,onClose,onProgramaCreated}) {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const [areas,setAreas]=useState([]);
    const [materias,setMaterias]= useState([]);
    const today = new Date();
    useEffect(()=>{
        fetchData();
        fetchMateria();
      },open);
      const fetchData = ()=>{
        fetch(`${apiUrl}KnowledgeArea/GetAll`,{
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
      const fetchPeriodo = ()=>{
        fetch(`${apiUrl}KnowledgeArea/GetAll`,{
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
         
            materiaId: "",
            profesorId: "",
            capacidad: "",
            numeroRegistrados:"" ,
            fecha:today,
            horaInicio: "",
            horaFin: "",
            areaConocimientoId: "",
            periodoId: "",
            diaSemana: "",
            cuposDisponibles: "",
            estado: ""
        },validationSchema:valiCurso,
        onSubmit:(values)=>{
            const data = {...values};
            fetch(`${apiUrl}Curso`,{
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
        <Dialog className="col-6 mx-auto" open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Curso Academico</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={formikPrograma.handleSubmit} class="row g-3">
                        <label  class="col-md-3">
                            Capacidad:
                            <input type="number" name="capacidad"
                            value={formikPrograma.values.capacidad}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.capacidad && formikPrograma.errors.capacidad && (
                                <div className="error">{formikPrograma.errors.capacidad}</div>
                                )}
                        </label>
                        <label  class="col-md-4">
                            Cupos disponibles:
                            <input type="number" name="cuposDisponibles"
                            value={formikPrograma.values.cuposDisponibles}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cuposDisponibles && formikPrograma.errors.cuposDisponibles && (
                                <div className="error">{formikPrograma.errors.cuposDisponibles}</div>
                                )}
                        </label>
                        <label class="col-md-5">
                        Numero Registrados:
                            <input type="number" name="numeroRegistrados"
                            value={formikPrograma.values.numeroRegistrados}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.numeroRegistrados && formikPrograma.errors.numeroRegistrados && (
                                <div className="error">{formikPrograma.errors.numeroRegistrados}</div>
                                )}
                           
                           
                        </label>
                        <label  class="col-md-5">
                            Dia:
                            <select
                            name="diaSemana"
                            
                            value={formikPrograma.values.diaSemana}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione dia</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miercoles">Martes</option>
                            <option value="Jueves">Martes</option>
                            <option value="Viernes">Martes</option>
                           
                            </select>
                            {formikPrograma.touched.diaSemana && formikPrograma.errors.diaSemana && (
                                <div className="error">{formikPrograma.errors.diaSemana}</div>
                                )}
                           
                        </label>
                        <label  class="col-md-3">
                            Hora Inicio:
                            <input type="time" name="horaInicio"
                            value={formikPrograma.values.horaInicio}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.horaInicio && formikPrograma.errors.horaInicio && (
                                <div className="error">{formikPrograma.errors.horaInicio}</div>
                                )}
                        </label>
                        <label  class="col-md-3">
                            Hora Fin:
                            <input type="time" name="horaFin"
                            value={formikPrograma.values.horaFin}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.horaFin && formikPrograma.errors.horaFin && (
                                <div className="error">{formikPrograma.errors.horaFin}</div>
                                )}
                        </label>
                        <label >
                            Area de Conocimiento:
                            <select
                            name="areaConocimientoId"
                            value={formikPrograma.values.areaConocimientoId}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione modalidad</option>
                            {areas.map((area,index)=>(
                                <option key={index} value={area.id}>
                                    {area.name}</option>
                            ))}
                            </select>
                            {formikPrograma.touched.areaConocimientoId && formikPrograma.errors.areaConocimientoId && (
                                <div className="error">{formikPrograma.errors.areaConocimientoId}</div>
                                )}
                           
                        </label>
                        <label class="col-md-6">
                            Profesor:
                            <select
                            name="profesorId"
                            value={formikPrograma.values.profesorId}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione profesor</option>
                            {areas.map((area,index)=>(
                                <option key={index} value={area.id}>
                                    {area.name}</option>
                            ))}
                            </select>
                            {formikPrograma.touched.profesorId && formikPrograma.errors.profesorId && (
                                <div className="error">{formikPrograma.errors.profesorId}</div>
                                )}
                           
                        </label>
                        <label class="col-md-6">
                            Materia:
                            <select
                            name="materiaId"
                            value={formikPrograma.values.materiaId}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione materia</option>
                            {materias.map((area,index)=>(
                                <option key={index} value={area.id}>
                                    {area.nombre}</option>
                            ))}
                            </select>
                            {formikPrograma.touched.materiaId && formikPrograma.errors.materiaId && (
                                <div className="error">{formikPrograma.errors.materiaId}</div>
                                )}
                           
                        </label>
                        <label class="col-md-6">
                            Periodo:
                            <select
                            name="periodoId"
                            value={formikPrograma.values.periodoId}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione periodo</option>
                            <option value="1">Abierto</option>
                            <option value="2">Cerrado</option>
                           
                            </select>
                            {formikPrograma.touched.periodoId && formikPrograma.errors.periodoId && (
                                <div className="error">{formikPrograma.errors.periodoId}</div>
                                )}
                           
                        </label>
                        <label class="col-md-5">
                            Estado:
                            <select
                            name="estado"
                            value={formikPrograma.values.estado}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione estado</option>
                            <option value="Abierto">Abierto</option>
                            <option value="Cerrado">Cerrado</option>
                           
                            </select>
                            {formikPrograma.touched.estado && formikPrograma.errors.estado && (
                                <div className="error">{formikPrograma.errors.estado}</div>
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

export default CrearCurso;