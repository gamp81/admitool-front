import React,{ useEffect, useState } from "react";
import { useFormik } from "formik";
import { Dialog, DialogTitle,DialogContent } from "@mui/material";
import {Materia} from '../../../pages/utils/validateForm';
function CrearMateria({open,onClose,onProgramaCreated}) {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
   
    const formikPrograma = useFormik({
        initialValues:{
            nombre:"",
            codigo:"",
                   
        },validationSchema:Materia,
        onSubmit:(values)=>{
            console.log("Enviando formulario con valores:", values);
            const data = {...values};
            fetch(`${apiUrl}Materium`,{
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
            <DialogTitle>Materia Academica</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={formikPrograma.handleSubmit}>
                        <label>
                            Nombre de Materia:
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
                            Codigo de Materia:
                            <input type="text" name="codigo"
                            value={formikPrograma.values.codigo}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.codigo && formikPrograma.errors.codigo && (
                                <div className="error">{formikPrograma.errors.codigo}</div>
                                )}
                        </label>
                       {/*  <label>
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
                           
                        </label> */}
                        
                        <div className="form-buttons">
                            <button type="submit">REGISTRAR</button>
                        </div>
                    </form>
                </div>
            </DialogContent>

        </Dialog>
    );
}

export default CrearMateria;