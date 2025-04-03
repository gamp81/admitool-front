import React,{ useEffect, useState } from "react";
import { useFormik } from "formik";
import { Dialog, DialogTitle,DialogContent } from "@mui/material";
import {validaPeriodo} from '../../utils/validateForm';
function CrearPeriodo({open,onClose,onProgramaCreated}) {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const formikPrograma = useFormik({
        initialValues:{
         
            descripcion: "",
            anio: "",
            fechaVigenciaDesde: "",
            fechaVigenciaHasta:"" ,
            fechaRegistro:"",
            tipo:"",
            estado: ""
        },validationSchema:validaPeriodo,
        onSubmit:(values)=>{
            const data = {...values};
            fetch(`${apiUrl}Periodo`,{
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
            <DialogTitle>Periodo Academico</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={formikPrograma.handleSubmit} class="row g-3">
                        <label  class="col-md-9">
                        Descripcion:
                            <input type="string" name="descripcion"
                            value={formikPrograma.values.descripcion}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.descripcion && formikPrograma.errors.descripcion && (
                                <div className="error">{formikPrograma.errors.descripcion}</div>
                                )}
                        </label>
                        <label  class="col-md-3">
                            Año:
                            <input type="string" name="anio"
                            value={formikPrograma.values.anio}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.anio && formikPrograma.errors.anio && (
                                <div className="error">{formikPrograma.errors.anio}</div>
                                )}
                        </label>
                        <label class="col-md-4">
                        Vigencia Desde:
                            <input type="date" name="fechaVigenciaDesde"
                            value={formikPrograma.values.fechaVigenciaDesde}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.fechaVigenciaDesde && formikPrograma.errors.fechaVigenciaDesde && (
                                <div className="error">{formikPrograma.errors.fechaVigenciaDesde}</div>
                                )}
                         </label>
                       
                        <label  class="col-md-4">
                        Vigencia Hasta:
                            <input type="date" name="fechaVigenciaHasta"
                            value={formikPrograma.values.fechaVigenciaHasta}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.fechaVigenciaHasta && formikPrograma.errors.fechaVigenciaHasta && (
                                <div className="error">{formikPrograma.errors.fechaVigenciaHasta}</div>
                                )}
                        </label>
                        <label  class="col-md-4">
                        Fecha Registro:
                            <input type="date" name="fechaRegistro"
                            value={formikPrograma.values.fechaRegistro}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.fechaRegistro && formikPrograma.errors.fechaRegistro && (
                                <div className="error">{formikPrograma.errors.fechaRegistro}</div>
                                )}
                        </label>
                        <label  class="col-md-5">
                            Tipo:
                            <input type="string" name="tipo"
                            value={formikPrograma.values.tipo}
                            onChange={formikPrograma.handleChange}
                            onBlur={formikPrograma.handleBlur}>
                            </input>
                            {formikPrograma.touched.tipo && formikPrograma.errors.tipo && (
                                <div className="error">{formikPrograma.errors.tipo}</div>
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
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="NO ACTIVO">NO ACTIVO</option>
                           
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

export default CrearPeriodo;