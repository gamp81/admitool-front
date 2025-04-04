import React,{ useEffect, useState } from "react";
import { useFormik } from "formik";
import { Dialog, DialogTitle,DialogContent } from "@mui/material";
import {AsigancionPeriodo} from '../../../pages/utils/validateForm';
function AutoPeriodo({open,onClose,onProgramaCreated}) {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const [periodos,setPeriodos]=useState([]);
    
    useEffect(()=>{
        fetchData();
      
      },[]);
      const fetchData = ()=>{
        fetch(`${apiUrl}Periodo`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            /* "Authorization": `Bearer ${token}` */
          }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos al modal Periodo: ",result);
          
          setPeriodos(Object.values(result)|| []);
          //console.log("datos traidos : Object.values(result.listData)",Object.values(result.listData));
        }).catch(error=>console.log("Error al obtener los datos",error));
      }
     
    const formikAutoPeriodo = useFormik({
        initialValues:{
            periodoId: "",
            
           
        },validationSchema:AsigancionPeriodo,
        onSubmit:(values)=>{
            const data = {...values};
            fetch(`${apiUrl}AsignacionCurso/auto/periodo`,{
                method:'POST',
                headers:{
                  'Content-Type':'application/json' 
            },
            body: JSON.stringify(data)}
        ).then(response=>response.json())
        .then(result=>{
            console.log('resultado de res ',result.mensaje);
            alert(result.mensaje);
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
            <DialogTitle>Asignación por periodo</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={formikAutoPeriodo.handleSubmit}>
                        <label>
                            Periodo:
                            <select
                            name="periodoId"
                            value={formikAutoPeriodo.values.periodoId}
                            onChange={formikAutoPeriodo.handleChange}
                            onBlur={formikAutoPeriodo.handleBlur}>
                            
                            <option value="">Seleccione periodo</option>
                            {periodos.map((periodo,index)=>(
                                <option key={index} value={periodo.id}>
                                    {periodo.descripcion}</option>
                            ))}
                            
                            
                            </select>
                            {formikAutoPeriodo.touched.periodoId && formikAutoPeriodo.errors.periodoId && (
                                <div className="error">{formikAutoPeriodo.errors.periodoId}</div>
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

export default AutoPeriodo;