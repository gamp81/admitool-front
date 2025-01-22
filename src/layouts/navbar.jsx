import { Navbar, Nav, Container,NavDropdown,Form,Button  } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom"
import React, { useContext } from "react";
import logo from '../logo.svg';
const NavBar = () => {
   
    return(
       <>    
       <Navbar className="App-header" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/" ><img src={logo} className="App-logo" alt="logo" /> AdmiTool</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
                <Nav.Link  as={Link} to="/login">Ingresar/Crear Cuenta</Nav.Link>   
                <Nav.Link  as={Link} to="/register">Crear Cuenta</Nav.Link>            
                <Nav.Link  as={Link} to="/carreras">Carreras</Nav.Link>   
                <Nav.Link  as={Link} to="/menu">Menu</Nav.Link>
                <Nav.Link  as={Link} to="/faspirante">Ficha</Nav.Link>
{/* 
                <Nav.Link  as={Link} to="/fichaaspirante2">Ficha</Nav.Link>            
                <Nav.Link  as={Link} to="/DatosPersonales">DatosPersonales</Nav.Link>    */}
                
            
                
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