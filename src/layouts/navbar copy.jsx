import { Navbar, Nav, Container,NavDropdown,Form,Button  } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom"
import React, { useContext } from "react";
import logo from '../logo.svg';
import "../style/navbar.css"
import { AuthContext } from "../context/AuthContext";
import rolesConfig from "../config/rolesConfig";
const NavBar = () => {
    const { logout,isAuthenticated,user } = useContext(AuthContext);
    return(
       <>    
       <Navbar className="bg-gray-900 App-header px-4 py-2" >
        <Container>
            <Navbar.Brand as={Link} to="/" className="flex items-center space-x-2"><img src={logo} className="h-auto w-10 App-logo" alt="logo" /> AdmiTool</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex flex-col gap-2 lg:flex-row lg:gap-4 me-auto">
                    <Nav.Link as={Link} to="/" className="text-white hover:text-gray-300">Inicio</Nav.Link>
                    {isAuthenticated && rolesConfig[user.role]?.includes("/menu") && (<Nav.Link  as={Link} to="/menu" className="text-white hover:text-gray-300">Menu</Nav.Link>)} 
                    
                    {isAuthenticated && rolesConfig[user.role]?.includes("/menuadmin") && (<Nav.Link as={Link} to="/menuadmin" className="text-white hover:text-gray-300" >Administrador</Nav.Link>)} 
                </Nav>
                    {/* Elemento del usuario a la derecha */}
                <Nav className="flex flex-col gap-2 lg:flex-row lg:gap-4 ms-auto">
                     {/* Renderizar el link "Ingresar" solo si no está autenticado */}
                     {!isAuthenticated && ( <Nav.Link as={Link} to="/login" className="text-white hover:text-gray-300"> Ingresar  </Nav.Link> )}
                    {!isAuthenticated && (<Nav.Link  as={Link} to="/register" className="text-white hover:text-gray-300">Crear Cuenta</Nav.Link>    )}
                    {isAuthenticated && (<Nav.Link as={Link} to="/" disabled className="text-white">{user.nombre}</Nav.Link> )}
                    {isAuthenticated &&  (<Nav.Link  onClick={logout} to="/logout" className="text-white hover:text-red-600">Logout</Nav.Link> )}
                </Nav>
            
            </Navbar.Collapse>
        </Container>
        </Navbar>  

        <section>
            <Outlet></Outlet>
        </section> 
       </> 
    )
}
export default NavBar