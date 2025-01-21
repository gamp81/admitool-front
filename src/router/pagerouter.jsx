import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBarHeader from '../layouts/navbar';
import Login2 from '../components/LoginForm';
import Login from '../pages/login';
import CrearCuenta from '../pages/crearcuenta';
import Register from '../components/register';
import Carrera from '../pages/carreras';
import Faspirante from '../pages/faspirante'
import WelcomeContent from '../components/WelcomeContent'
const Pagerouter = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <NavBarHeader /> }>
                     <Route index element={ <WelcomeContent /> } /> 
                {/*     <Route path='register' element={ <Register /> } /> */}
                    <Route path='login' element={ <Login /> } /> 
                    <Route path='register2' element={ <Register/> } /> 
                    <Route path='register' element={ <CrearCuenta/> } /> 
                    <Route path='carreras' element={ <Carrera /> } />
                    <Route path='faspirante' element={ <Faspirante /> } />
                    <Route path='login2' element={ <Login2 /> } />
                    <Route path='*' element={ <Navigate replace to="/"/> }/>
                </Route>
            </Routes> 
        </BrowserRouter>

    )

}
export default Pagerouter