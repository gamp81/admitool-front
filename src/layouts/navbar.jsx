
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom"
import React, { useContext,useState} from "react";
import logo from '../logo.svg';
import { AuthContext } from "../context/AuthContext";
import rolesConfig from "../config/rolesConfig";
const NavBar = () => {
    const { logout,isAuthenticated,user } = useContext(AuthContext);
     const [expanded, setExpanded] = useState(false);
    return(
       <>    
       <Navbar className="App-header" variant="dark" expand="md" expanded={expanded}>
        <Container>
            <Navbar.Brand as={Link} to="/" ><img src={logo} className="App-logo" alt="logo" /> AdmiTool</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-responsive" onClick={() => setExpanded(expanded ? false : true)}/>
            <Navbar.Collapse id="navbar-responsive">
                <Nav className="me-auto bg-dark">
                    <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
                    {isAuthenticated && rolesConfig[user.role]?.includes("/menu") && (<Nav.Link  as={Link} to="/menu">Menu</Nav.Link>)} 
                    
                    {isAuthenticated && rolesConfig[user.role]?.includes("/menuadmin") && (<Nav.Link as={Link} to="/menuadmin" >Administrador</Nav.Link>)} 
                </Nav>
                    {/* Elemento del usuario a la derecha */}
                <Nav className="ms-auto bg-dark">
                     {/* Renderizar el link "Ingresar" solo si no está autenticado */}
                     {!isAuthenticated && ( <Nav.Link as={Link} to="/login"> Ingresar  </Nav.Link> )}
                    {!isAuthenticated && (<Nav.Link  as={Link} to="/register">Crear Cuenta</Nav.Link>    )}
                    {isAuthenticated && (<Nav.Link as={Link} to="/" disabled>{user.nombre}</Nav.Link> )}
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