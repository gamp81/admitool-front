import React,{ useEffect, useState } from "react";
import { useFormik } from "formik";
import { Dialog, DialogTitle,DialogContent } from "@mui/material";
import {validaPeriodoCarrera} from '../../utils/validateForm';
function CrearPeriodoCarrera({row,open,onClose,onProgramaCreated}) {
    const [carreras,setCarreras] = useState(null);
    const [periodos,setPeriodos] = useState(null);
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    useEffect(()=>{
            fetchData();
            fetchPeriodo();
          },[open,onClose,onProgramaCreated]);
    const fetchData = ()=>{
        fetch(`${apiUrl}Carrera`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            /* "Authorization": `Bearer ${token}` */
          }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos al modal : ",result);
          setCarreras(Object.values(result)|| []);
          console.log("datos traidos : Object.values(result.listData)",Object.values(result.listData));
        }).catch(error=>console.log("Error al obtener los datos",error));
      }
    const fetchPeriodo= () =>{
        fetch(`${apiUrl}Periodo`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              /* "Authorization": `Bearer ${token}` */
            }
          }).then(response=>response.json())
          .then(result=>{
            console.log("datos traidos al Periodo : ",result);
            setPeriodos(Object.values(result)|| []);
            console.log("datos traidos : Object.values(result.listData)",Object.values(result.listData));
          }).catch(error=>console.log("Error al obtener los datos",error));
      }

    const formikPrograma = useFormik({
        initialValues:{
         
            periodoId: "",
            carreraId: "",
            cupoVulnerable: "",
            cupoMeritoAcademico:"" ,
            cupoUltimoBachiller:"",
            cupoGenera:"",
            cupoVulnerableAceptado: "",
            cupoMeritoAcademicoAceptado:"",
            cupoUltimoBachillerAceptado:"",
            cupoGeneralAceptado:"",
        },validationSchema:validaPeriodoCarrera,
        onSubmit:(values)=>{
            const data = {...values};
            fetch(`${apiUrl}PeriodoCarrera`,{
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
            <DialogTitle>Carrera/Periodo Academico</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={formikPrograma.handleSubmit} className="row g-3">
                    <label >
                            Periodo:
                            <select
                            name="periodoId"
                            value={formikPrograma.values.periodoId}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione modalidad</option>
                            {periodos?.map((periodo,index)=>(
                                <option key={index} value={periodo.id}>
                                    {periodo.descripcion}</option>
                            ))}
                            </select>
                            {formikPrograma.touched.periodoId && formikPrograma.errors.periodoId && (
                                <div className="error">{formikPrograma.errors.periodoId}</div>
                                )}
                           
                        </label>
                    <label >
                            Carrera:
                            <select
                            name="carreraId"
                            value={formikPrograma.values.carreraId}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            
                            <option value="">Seleccione modalidad</option>
                            {carreras?.map((carrera,index)=>(
                                <option key={index} value={carrera.id}>
                                    {carrera.nombre}</option>
                            ))}
                            </select>
                            {formikPrograma.touched.carreraId && formikPrograma.errors.carreraId && (
                                <div className="error">{formikPrograma.errors.carreraId}</div>
                                )}
                           
                        </label>
                        <label  className="col-md-5">
                        Cupo Vulnerable:
                            <input type="number" name="cupoVulnerable"
                            value={formikPrograma.values.cupoVulnerable}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cupoVulnerable && formikPrograma.errors.cupoVulnerable && (
                                <div className="error">{formikPrograma.errors.cupoVulnerable}</div>
                                )}
                        </label>
                        <label  className="col-md-5">
                        Cupo Merito Academico:
                            <input type="number" name="cupoMeritoAcademico"
                            value={formikPrograma.values.cupoMeritoAcademico}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cupoMeritoAcademico && formikPrograma.errors.cupoMeritoAcademico && (
                                <div className="error">{formikPrograma.errors.cupoMeritoAcademico}</div>
                                )}
                        </label>
                        <label className="col-md-5">
                            Cupo Ultimo Bachiller:
                            <input type="number" name="cupoUltimoBachiller"
                            value={formikPrograma.values.cupoUltimoBachiller}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cupoUltimoBachiller && formikPrograma.errors.cupoUltimoBachiller && (
                                <div className="error">{formikPrograma.errors.cupoUltimoBachiller}</div>
                                )}
                         </label>
                       
                        <label  className="col-md-5">
                         Cupo General:
                            <input type="number" name="cupoGenera"
                            value={formikPrograma.values.cupoGenera}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cupoGenera && formikPrograma.errors.cupoGenera && (
                                <div className="error">{formikPrograma.errors.cupoGenera}</div>
                                )}
                        </label>
                        <label  className="col-md-5">
                        Cupo Vulnerable Aceptado:
                            <input type="number" name="cupoVulnerableAceptado"
                            value={formikPrograma.values.cupoVulnerableAceptado}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cupoVulnerableAceptado && formikPrograma.errors.cupoVulnerableAceptado && (
                                <div className="error">{formikPrograma.errors.cupoVulnerableAceptado}</div>
                                )}
                        </label>
                        <label  className="col-md-6">
                        Cupo Merito Academico Aceptado:
                            <input type="number" name="cupoMeritoAcademicoAceptado"
                            value={formikPrograma.values.cupoMeritoAcademicoAceptado}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cupoMeritoAcademicoAceptado && formikPrograma.errors.cupoMeritoAcademicoAceptado && (
                                <div className="error">{formikPrograma.errors.cupoMeritoAcademicoAceptado}</div>
                                )}
                        </label>
                        
                        <label className="col-md-6">
                        Cupo Ultimo Bachiller Aceptado:
                            <input type="number"
                            name="cupoUltimoBachillerAceptado"
                            value={formikPrograma.values.cupoUltimoBachillerAceptado}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cupoUltimoBachillerAceptado && formikPrograma.errors.cupoUltimoBachillerAceptado && (
                                <div className="error">{formikPrograma.errors.cupoUltimoBachillerAceptado}</div>
                                )}
                           
                        </label>
                        <label  className="col-md-6">
                            Cupo General Aceptado:
                            <input type="number" name="cupoGeneralAceptado"
                            value={formikPrograma.values.cupoGeneralAceptado}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.cupoGeneralAceptado && formikPrograma.errors.cupoGeneralAceptado && (
                                <div className="error">{formikPrograma.errors.cupoGeneralAceptado}</div>
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

export default CrearPeriodoCarrera;