import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import InputGroup from 'react-bootstrap/InputGroup';
const Register = () => {
    // const navigate = useNavigate();
    return(
        <div className='login col-4 mx-auto'>
            <h1>Registro</h1>
            <div >
            
            <Form>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Numero de Cedula:</InputGroup.Text>
                    <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    /></InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Nombres:</InputGroup.Text>
                    <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Email:</InputGroup.Text>
                    <Form.Control type="email" placeholder="Enter email"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Password:</InputGroup.Text>
                    <Form.Control type="password" placeholder="Enter password"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Password:</InputGroup.Text>
                    <Form.Control type="password" placeholder="Repeat password"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>
                <Button variant="primary" type="submit">
                    Crear Cuenta
                </Button>
                
            </Form>
            </div>
        </div>
    )
}
export default Register