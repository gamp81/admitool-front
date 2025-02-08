import React, { useState } from "react";
import "../style/recuperarcuenta.css";
import { useNavigate } from "react-router-dom";

const RecuperarCuenta = () =>{
    const [mail,setMail]=useState('');
    const navigate = useNavigate();
    const handleSubmit =(e)=>{
        e.preventDefault();
        const data={
            dt1:mail,
            dt2:"",
        };
        fetch("https://localhost:7173/api/Auth/RecoverPassword",{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }).then(result=>{
            alert("Se ha enviado un correo electronico para recuperar su contraseña")
            navigate("/home"); 
        })
    }
    return (  
        <div className="formulario-container">
        <h6>RECUPERAR CUENTA</h6>
        <div >
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" onChange={(event)=>{setMail(event.target.value)}}
                    placeholder="Email"
                    className="custom-input"
                    />

                </label>
                <div className="form-buttons">
                    <button type="submit" onClick={handleSubmit}>ENVIAR</button>
                </div>

            </form>
        </div>
        </div>
    );
}

export default RecuperarCuenta;