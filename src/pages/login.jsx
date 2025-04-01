import React, { useState,useContext } from "react";
import {useNavigate,Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import "../style/crearcuenta.css";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import { step2ValidationSchema } from '../pages/utils/validateForm';
const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginSuccessful,setLoginsuccessful]=useState(false);
  const apiUrl = process.env.REACT_APP_API_AUTH ;
 
  const formikLogin = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: step2ValidationSchema,
          onSubmit: (values) => {
            const data= {...values};
            fetch(`${apiUrl}Auth/login`,{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(data)
            }).then(response=>response.json())
            .then(result=>{
              //console.log(" data traida  ",result.data.token) 
              if (result.data){
                localStorage.setItem('token',result.data.token)
                setLoginsuccessful(true);
                login(result.data.token);
                 console.log("navega a menu",user );
                 if (user.role==="ADMINISTRADOR") {
                  navigate("/menuadmin"); 
                 }else{
                  navigate("/menu"); 
                 }
               
              }else{
                setLoginsuccessful(false);
                alert("Credenciales incorrectas");
                
              }
            }).catch(error=>{
              console.log(error)
            })
        
          },
    });

 
  
  return (
    <>
    <h6>INICIAR SESIÓN</h6>
    <div className="formulario-container">
   
      <form onSubmit={formikLogin.handleSubmit}>
        
        <label>
          Email:
          {/* <input onChange={(event)=>{setUsername(event.target.value)}}
                           placeholder="username"
                           className="custom-input"
                           type="mail" /> */}
       <input
                  type="email"
                  name="email"
                  value={formikLogin.values.email}
                  onChange={formikLogin.handleChange}
                  onBlur={formikLogin.handleBlur}
                />
                {formikLogin.touched.email && formikLogin.errors.email && (
                  <div className="error">{formikLogin.errors.email}</div>
                )}
        </label>
        <label>
        Contraseña:
        {/* <input onChange={(event)=>{setPassword(event.target.value)}}
                           placeholder="password"
                           className="custom-input"
                           type="password" /> */}
         <input
                  type="password"
                  name="password"
                  value={formikLogin.values.password}
                  onChange={formikLogin.handleChange}
                  onBlur={formikLogin.handleBlur}
                />
                {formikLogin.touched.password && formikLogin.errors.password && (
                  <div className="error">{formikLogin.errors.password}</div>
                )}
        </label>
        <p><Nav.Link as={Link} to="/RecoverPassword" >Olvidó la contraseña ?</Nav.Link></p>
         <div className="form-buttons">
          <button type="submit" >INICIAR SESIÓN</button>
         
        </div>
       
      </form>
    </div>
    </>
  );
};

export default Login;