import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBarHeader from '../layouts/navbar';
import Login2 from '../components/LoginForm';
import Login from '../pages/login';
import CrearCuenta from '../pages/crearcuenta';
import Register from '../pages/register.tsx';
import Menu from '../pages/menuprincipal';

import Carrera from '../pages/carreras';
import Faspirante from '../pages/faspirante'
import Fichaaspirante from '../pages/fichatabs'
import WelcomeContent from '../components/WelcomeContent'
import DatosPersonales from '../pages/datospersonales';
import Postulacion from '../pages/postulacion';
/* import { Logout } from '@mui/icons-material'; */
import Logoutbutton from '../components/logout.jsx'
import { AuthPovider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute.jsx';
const Pagerouter = () =>{
    return (
        <AuthPovider>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={ <NavBarHeader /> }>
                     <Route index element={ <WelcomeContent /> } /> 
                {/*     <Route path='register' element={ <Register /> } /> */}
                    <Route path='login' element={ <Login /> } /> 
                    <Route path='register2' element={ <Register/> } /> 
                    <Route path='register' element={ <CrearCuenta/> } /> 
                    <Route path='menu' element={ 
                         <ProtectedRoute> <Menu/> </ProtectedRoute>
                     } /> 
                   
                    <Route path='inscripcion' element={ <Carrera /> } />
                    <Route path='postulacion' element={ <Postulacion /> } />
                    <Route path='faspirante' element={ <Faspirante /> } />
                    <Route path='fichaaspirante' element={ <Fichaaspirante /> } />
                    <Route path='DatosPersonales' element={ <DatosPersonales /> } />
                    <Route path='login2' element={ <Login2 /> } />
                    <Route path='logout' element={ <Logoutbutton /> } />
                    <Route path='*' element={ <Navigate replace to="/"/> }/>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                          
                            </ProtectedRoute>
                        }
                        />
                </Route>
            </Routes> 
            </BrowserRouter>
        </AuthPovider>
        

    )

}
export default Pagerouter