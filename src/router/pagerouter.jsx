import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBarHeader from '../layouts/navbar';
import Login from '../pages/login';

import Register from '../pages/register.jsx';
import Menu from '../pages/menuprincipal';
import Carrera from '../pages/carreras2';
import Faspirante from '../pages/faspirante'
import WelcomeContent from '../components/WelcomeContent'
import Postulacion from '../pages/postulacion';
import Logoutbutton from '../components/logout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Inscription from '../components/inscripcionDownload.jsx';
import RecoverPassword from '../pages/recuperarcuenta.jsx';
import AdminAreaLista from '../pages/admin/area/lista.jsx';
import AdminAreaCrear from '../pages/admin/area/create.jsx'
const Pagerouter = () =>{
    return (
       
        <BrowserRouter future={{ v7_startTransition: true }}>
            <Routes>
                <Route path='/' element={ <NavBarHeader /> }>
                    <Route index element={ <WelcomeContent /> } /> 
                    <Route path='login' element={ <Login /> } /> 
                    <Route path='register' element={ <Register/> } /> 
                    <Route path='RecoverPassword' element={ <RecoverPassword/> } /> 
                    <Route path='menu' element={ 
                         <ProtectedRoute> <Menu/> </ProtectedRoute>
                     } /> 
                   
                    <Route path='inscripcion' element={ 
                        <ProtectedRoute><Carrera /></ProtectedRoute> } 
                        />
                     <Route path='inscripcionend' element={ 
                        <ProtectedRoute><Inscription /></ProtectedRoute> } 
                        />
                    <Route path='postulacion' element={ 
                        <ProtectedRoute><Postulacion /> </ProtectedRoute>
                        } />
                    <Route path='faspirante' element={ 
                        <ProtectedRoute><Faspirante /> </ProtectedRoute>
                        } />
                 
                   
                    <Route path='logout' element={ <Logoutbutton /> } />

                    <Route path='AdminAreaLista' element={ <AdminAreaLista /> } />
                    <Route path='AdminAreaCrear' element={ <AdminAreaCrear /> } />
                    <Route path='*' element={ <Navigate replace to="/"/> }/>
                  
                </Route>
            </Routes> 
            </BrowserRouter>
       
        

    )

}
export default Pagerouter