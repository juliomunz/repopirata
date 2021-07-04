import React, { useState } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import { useHistory, useParams, Link } from "react-router-dom";
import PiratesService from '../services/pirates.services';


const NewPirate = () => {
    //const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams();
    const history = useHistory()
    const pirateService = new PiratesService;
    
    const [pirateForm, setPirateForm] = useState({
        name: '',
        puesto: '',
        tesoros: '',
        frase: '',
        pierna: '',
        ojo: '',
        brazo: ''
    })

    const onSubmitHandler = (e) => {
        e.preventDefault();
        //console.log('llegué')
        if (id) {
            pirateService.updateExistingPirate(id, pirateForm);
            history.push("/");
        } else {
            axios.post('http://localhost:8000/api/pirates/new', pirateForm)
                .then(() => history.push("/Pirates"))
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="pirate-header mt-3">
            <div className="container-back">
                <h1>Add Pirate</h1>
                <Link to="/Pirates">
                    <Button variant="primary">Crew Board</Button>
                </Link>
            </div>
            <div className="pirate-form-container">
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group controlId="exampleForm.ControlTextarea3">
                        <Form.Label>Pirate Name</Form.Label>
                        <Form.Control name="name" type="text" value={pirateForm.name} onChange={(e) => setPirateForm({ ...pirateForm, [e.target.name]: e.target.value })} />
                    </Form.Group>
                    {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Puesto</Form.Label>
                        <Form.Control name="puesto" type="text" value={pirateForm.puesto} onChange={(e) => setPirateForm({ ...pirateForm, [e.target.name]: e.target.value })} />
                    </Form.Group> */}
                    <Form.Group controlId="exampleForm.ControlTextarea3">
                        <Form.Label># of treasure Chests:</Form.Label>
                        <Form.Control name="tesoros" type="number" value={pirateForm.tesoros} onChange={(e) => setPirateForm({ ...pirateForm, [e.target.name]: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Pirate Catch Phrase</Form.Label>
                        <Form.Control as="textarea" rows={3} name="frase" type="text" value={pirateForm.frase} onChange={(e) => setPirateForm({ ...pirateForm, [e.target.name]: e.target.value })} />
                    </Form.Group>
                    <fieldset>
                    <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                        Prosthesis
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                        type="checkbox"
                        label="Peg Leg"
                        name="pierna"
                        id="pierna"
                        value={pirateForm.pierna} onChange={(e) => setPirateForm({ ...pirateForm, [e.target.name]: e.target.value })} 
                        />
                        <Form.Check
                        type="checkbox"
                        label="Eye Patch"
                        name="ojo"
                        id="ojo"
                        value={pirateForm.ojo} onChange={(e) => setPirateForm({ ...pirateForm, [e.target.name]: e.target.value })}
                        />
                        <Form.Check
                        type="checkbox"
                        label="Hook Hand"
                        name="brazo"
                        id="brazo"
                        value={pirateForm.brazo} onChange={(e) => setPirateForm({ ...pirateForm, [e.target.name]: e.target.value })}
                        />
                    </Col>
                    </Form.Group>
                    </fieldset>
                    <div className="label-input">
                    <label htmlFor="rating">Crew Position</label>
                    <br/>
                    <select id="puesto" name="puesto" value={pirateForm.puesto} onChange={(e) => setPirateForm({ ...pirateForm, [e.target.name]: e.target.value })} >
                    <option value="Captain">Captain</option>
                    <option value="First Mate">First Mate</option>
                    <option value="Quarter Master">Quarter Master</option>
                    <option value="Boatswain">Boatswain</option>
                    <option value="Powder Monkey">Powder Monkey</option>
                    </select>
                    </div>
                    <br/>
                    <Button variant="primary" type="submit">
                        Add Pirate
                    </Button>
                </Form>
        </div>
        </div>
    )
}

export default NewPirate;