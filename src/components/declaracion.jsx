import React, { useEffect, useState,useContext } from 'react';
import {AuthContext} from '../context/AuthContext'
import { UserContext } from '../context/UserContext';
const Declaracion = () => {
    const { userData } = useContext(UserContext);
    const { user } = useContext(AuthContext);
    
    //console.log("nombres ",userData)
    return (
        <div className="declaracion">
        <p >
        Yo, {userData?.nombres} {userData?.apellidos} ciudadano con número de identificación {user.docId}, declaro voluntariamente que: </p>
        <li>1. Ser responsable del ingreso de toda la información sobre mi persona en la plataforma de inscripción de Adadémico Admisiones de ESPOL.</li>

        <li>2. Ser responsable exclusivo del uso de las credenciales de acceso a la plataforma de Académico Admisiones de ESPOL.</li>

        <li>3. Ser responsable de la veracidad de la información registrada y conocer que en caso de comprobarse que la información falte de alguna manera a la verdad, la ESPOL suspenderá mi inscripción y anulará mi proceso de admisión, sin perjuicios a las acciones legales o las que hubiere lugar.</li>
        
        </div>
    );
}

export default Declaracion;