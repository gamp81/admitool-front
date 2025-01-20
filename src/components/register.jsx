import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import InputGroup from 'react-bootstrap/InputGroup';
import { useFetch } from '../hooks/useFetch';
const Register = () => {
   
    // const navigate = useNavigate();
    //const {fetchResponse} = useFetch("https://fakestoreapi.com/products?limit=15");
   
   
    console.log('montando header...');
    const [search,setSearch] = useState("")
    const [nombre,setNombre] = useState("")
    const searcher = (e)=>
    {
        setSearch(e.target.value)
    }
    const {fetchResponse} = useFetch("http://192.168.1.109:8088/api/users");
    const Consulta = (e)=>
        {
            
            //if (search.length===10){
                const results= !search ? fetchResponse : fetchResponse.filter((dato)=>dato.identificacion.includes(search))
                setNombre(results[0].name);
        
                console.log('users clothing...',results);
                console.log('nombre clothing...',results[0].name);
            //}
        }
    
   
  
    return(
        <div className='login col-4 mx-auto'>
            <h1>Registro</h1>
            <div >
            
            <Form>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm" >Numero de Cedula:</InputGroup.Text>
                    <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={search} onChange={searcher}/>
                    <Button variant="primary" onClick={Consulta}>
                    Validar
                    </Button>    
                </InputGroup> 
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Nombres:</InputGroup.Text>
                    <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"  value={nombre} 
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