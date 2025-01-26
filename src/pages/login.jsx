import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "../style/crearcuenta.css";

const Login = () => {
  const [password,setPassword]= useState('');
  const [username,setUsername]= useState('');
  const navigate = useNavigate();
  const [loginSuccessful,setLoginsuccessful]=useState(false);

  /* const [formData, setFormData] = useState({
    email: "",
    password: "",
    
  }); */

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log("Datos enviados:", formData); */
    const data = {
      email: username,
      password: password
    };
    fetch("https://localhost:7173/api/Auth/login",{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    }).then(response=>response.json())
    .then(result=>{
      console.log(result.token)
      if (result.token){
        localStorage.setItem('token',result.token)
        setLoginsuccessful(true);
        console.log("navega a menu");
        navigate("/menu");
      }else{
        setLoginsuccessful(false);
        alert("Credenciales incorrectas");
      }
    }).catch(error=>{
      console.log(error)
    })


  };
  



  return (
    <>
    <h6>INICIAR SESIÓN</h6>
    <div className="formulario-container">
   
      <form onSubmit={handleSubmit}>
        
        <label>
          Email:
          <input onChange={(event)=>{setUsername(event.target.value)}}
                           placeholder="username"
                           className="custom-input"
                           type="text" />
          {/* <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          /> */}
        </label>
        <label>
        Contraseña:
        <input onChange={(event)=>{setPassword(event.target.value)}}
                           placeholder="password"
                           className="custom-input"
                           type="password" />
          {/* <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          /> */}
        </label>
         <div className="form-buttons">
          <button type="submit" onClick={handleSubmit}>INICIAR SESIÓN</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;