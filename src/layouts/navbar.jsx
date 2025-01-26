import { Navbar, Nav, Container,NavDropdown,Form,Button  } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom"
import React, { useContext } from "react";
import logo from '../logo.svg';
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
    const { logout,isAuthenticated } = useContext(AuthContext);
    return(
       <>    
       <Navbar className="App-header" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/" ><img src={logo} className="App-logo" alt="logo" /> AdmiTool</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
                 {/* Renderizar el link "Ingresar" solo si no está autenticado */}
                {!isAuthenticated && ( <Nav.Link as={Link} to="/login"> Ingresar  </Nav.Link> )}
                
                {!isAuthenticated && (<Nav.Link  as={Link} to="/register">Crear Cuenta</Nav.Link>    )}         
              
                {isAuthenticated &&  (<Nav.Link  as={Link} to="/menu">Menu</Nav.Link>)} 
                {isAuthenticated &&  (<Nav.Link  onClick={logout} to="/logout">Logout</Nav.Link> )} 
         
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