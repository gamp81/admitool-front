import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {useFormik} from "formik";
import {AreaConocimiento} from '../../../pages/utils/validateForm'
import {Dialog, DialogContent, DialogTitle} from "@mui/material"
function CrearArea({open,onClose,onAreaCreated}) {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const navigate = useNavigate();
    const formikArea = useFormik({
        initialValues:{
            nombre:"",
            descripcion:"",
            icono:"",
            orden:0,
        },
        validationSchema:AreaConocimiento,
        onSubmit:(values)=>{
            const data = {...values};
            fetch(`${apiUrl}KnowledgeArea/Create`,{
                method:'POST',
                headers:{
                  'Content-Type':'application/json' 
            },
            body: JSON.stringify(data)}
        ).then(response=>response.json())
        .then(result=>{
            console.log('resultado de res ',result);
            alert("Registro completado.");
            if (onAreaCreated) {
                onAreaCreated();
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
        <Dialog className='login col-4 mx-auto' open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle><h2>Area de Conocimiento</h2></DialogTitle> 
            <DialogContent>
            <div >
        
        <form onSubmit={formikArea.handleSubmit}>
            
            <label>
                Nombre del Area
                <input
                type="text"
                name="nombre"
                value={formikArea.values.nombre}
                onChange={formikArea.handleChange}
                onBlur={formikArea.handleBlur}
                />
                {formikArea.touched.nombre && formikArea.errors.nombre && (
                <div className="error">{formikArea.errors.nombre}</div>
                )}
            </label>
            <label>
                Descripcion del Area
                <input
                type="text"
                name="descripcion"
                value={formikArea.values.descripcion}
                onChange={formikArea.handleChange}
                onBlur={formikArea.handleBlur}
                />
                {formikArea.touched.descripcion && formikArea.errors.descripcion && (
                <div className="error">{formikArea.errors.descripcion}</div>
                )}
            </label>
            <label>
                Icono del Area
                <input
                type="text"
                name="icono"
                value={formikArea.values.icono}
                onChange={formikArea.handleChange}
                onBlur={formikArea.handleBlur}
                />
                {formikArea.touched.icono && formikArea.errors.icono && (
                <div className="error">{formikArea.errors.icono}</div>
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

export default CrearArea;