import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState,useEffect,useRef } from "react";
import Swal from 'sweetalert2'


export default function Login () {
    const [nombre, setNombre]=useState('')
    const [apellido, setApellido]=useState('')
    const [correo, setCorreo]= useState('')
    const [contrasena, setContrasena]= useState('')
    const history = useHistory();
    const [error, setError]= useState('')
    const [iguales,setIguales]=useState(true);
    let redstyle={color:'red'};

    const [errors, setErrors] = useState({
        firstNameE: "",
        lastNameE: "",
        emailE: "",
        passwordE: "",
        confirmPasswordE: "",
        match: false
      });

      const [form,setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      const passwordRef=useRef(null);
      const cPasswordRef=useRef(null);
    


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

    const onChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
        const { firstName, lastName, email, password, confirmPassword } = form;
    
        
    
        if(e.target.name==='firstName' && e.target.value.length<2){
            setErrors({
                ...errors,
                firstNameE: "Nombre tiene menos de 2 caracteres",
              });
        }
        if(e.target.name==='firstName' && (e.target.value.length>=2||e.target.value.length===0)){
            setErrors({
                ...errors,
                firstNameE: "",
              });
        }
        
        if(e.target.name==='lastName' && e.target.value.length<2){
            setErrors({
                ...errors,
                lastNameE: "Apellido tiene menos de 2 caracteres",
              });
        }
        if(e.target.name==='lastName' && (e.target.value.length>=2||e.target.value.length===0)){
            setErrors({
                ...errors,
                lastNameE: "",
              });
        }
    
        if(e.target.name==='email' && e.target.value.length<5){
            setErrors({
                ...errors,
                emailE: "Email tiene menos de 5 caracteres",
              });
        }
        if(e.target.name==='email' && (e.target.value.length>=5||e.target.value.length===0)){
            setErrors({
                ...errors,
                emailE: "",
              });
        }
    
        if(e.target.name==='password' && e.target.value.length<8){
            setErrors({
                ...errors,
                passwordE: "Contraseña debe tener al menos 8 caracteres",
              });
        }
        if(e.target.name==='password' && (e.target.value.length>=8||e.target.value.length===0)){
            setErrors({
                ...errors,
                passwordE: "",
              });
              
              }
    
        const valp=passwordRef.current.value;
        const valcp=cPasswordRef.current.value;
    
        setIguales(valp===valcp);
    
      };
    

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
                                        <p style={redstyle}> {errors.firstNameE} </p>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Last Name:</Form.Label>
                                        <Col>
                                        <Form.Control type="text" required onChange={(e)=>setApellido(e.target.value)}/>
                                        <p style={redstyle}> {errors.lastNameE} </p>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Email:</Form.Label>
                                        <Col>
                                        <Form.Control type="email" required onChange={(e)=>setCorreo(e.target.value)}/>
                                        <p style={redstyle}> {errors.emailE} </p>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Password:</Form.Label>
                                        <Col>
                                        <Form.Control type="password" required onChange={(e)=>setContrasena(e.target.value)} ref={passwordRef}/>
                                        <p style={redstyle}> {errors.passwordE} </p>
                                        </Col>
                                    </Row>
                                        <br />
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Form.Label column lg={6}>Confirm Password:</Form.Label>
                                        <Col>
                                        <Form.Control type="password" required onChange={(e)=>setContrasena(e.target.value)} ref={cPasswordRef}/>
                                        <p style={redstyle}> {iguales ? '' : 'Las contraseñas deben ser iguales'} </p>
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