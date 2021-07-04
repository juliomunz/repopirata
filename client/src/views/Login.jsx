import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2'


export default function Login () {
    const [nombre, setNombre]=useState('')
    const [apellido, setApellido]=useState('')
    const [correo, setCorreo]= useState('')
    const [contrasena, setContrasena]= useState('')
    const history = useHistory();
    const [error, setError]= useState('')

    const registrar = async(e) =>{
        e.preventDefault()
        const usuario={nombre,apellido, correo,contrasena}
        const respuesta=await axios.post('http://localhost:8000/api/user/crear', usuario)
        const mensaje=respuesta.data.mensaje
            if (mensaje!=='Registrado'){
                alert(mensaje)
            }else {
                alert(mensaje)
            }    
       //console.log(respuesta)
        }

    const ingresar = async(e) =>{
        e.preventDefault()
        const usuario={correo,contrasena}
        const respuesta=await axios.post('http://localhost:8000/api/user/login', usuario)
        const mensaje=respuesta.data.mensaje
        history.push('/Pirates')
        if (mensaje!=='Bienvenido'){
            Swal.fire({
                icon: 'error',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })
        }else {
            const token=respuesta.data.token
            const nombre=respuesta.data.nombre
            const idusuario=respuesta.data.id
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('nombre',nombre)
            sessionStorage.setItem('idusuario',idusuario)
            //history.push('/')
        } //console.log(respuesta)
    }

    

    return (
        <div className="Header mt-3">
            <h3>Welcome to Pirate Crew</h3>
                <div className="container-login">
                    <CardGroup>
                        <Card>
                        <Card.Header className="text-center">Register</Card.Header>    
                        <Card.Body>
                            <Form onSubmit={registrar}>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Firts Name:</Form.Label>
                                        <Col>
                                        <Form.Control type="text" required onChange={(e)=>setNombre(e.target.value)}/>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Last Name:</Form.Label>
                                        <Col>
                                        <Form.Control type="text" required onChange={(e)=>setApellido(e.target.value)}/>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Email:</Form.Label>
                                        <Col>
                                        <Form.Control type="email" required onChange={(e)=>setCorreo(e.target.value)}/>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Password:</Form.Label>
                                        <Col>
                                        <Form.Control type="password" required onChange={(e)=>setContrasena(e.target.value)}/>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Confirm Password:</Form.Label>
                                        <Col>
                                        <Form.Control type="password" required onChange={(e)=>setContrasena(e.target.value)}/>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Button variant="primary" type="submit">Register</Button>
                            </Form>
                            </Card.Body>
                        </Card>
                        <Card>
                        <Card.Header className="text-center">Login</Card.Header>  
                        <Card.Body>
                            <Form onSubmit={ingresar}>
                            <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Email</Form.Label>
                                        <Col>
                                        <Form.Control type="email" autoFocus required onChange={(e)=>setCorreo(e.target.value)}/>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Password</Form.Label>
                                        <Col>
                                        <Form.Control type="password" required onChange={(e)=>setContrasena(e.target.value)}/>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={error !== '' ? true : false}>Login</Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </CardGroup>
                </div>
        </div>               
    )
}