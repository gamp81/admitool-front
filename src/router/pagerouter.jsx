import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBarHeader from '../layouts/navbar';
import Login2 from '../components/LoginForm';
import Login from '../components/login';
import WelcomeContent from '../components/WelcomeContent'
const Pagerouter = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <NavBarHeader /> }>
                     <Route index element={ <WelcomeContent /> } /> 
                {/*     <Route path='register' element={ <Register /> } /> */}
                    <Route path='login' element={ <Login /> } /> 
                    <Route path='login2' element={ <Login2 /> } />
                    <Route path='*' element={ <Navigate replace to="/"/> }/>
                </Route>
            </Routes> 
        </BrowserRouter>

    )

}
export default Pagerouter