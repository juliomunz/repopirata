import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap'

export default function Navigation(){

    const history = useHistory();
    
    const salir=()=>{
        sessionStorage.clear()
        history.push('/')
    }

    return (
                <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
                    <Navbar.Brand as={NavLink} to="/Misviajes">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>                      
                        <Nav>
                            <Nav.Link as={NavLink} to="/Misviajes">Bienvenido/a {sessionStorage.getItem('nombre')}</Nav.Link> 
                            <Nav.Link as={NavLink} to="/login" onClick={()=>salir()}>Cerrar sesión</Nav.Link>    
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>  
    )
}