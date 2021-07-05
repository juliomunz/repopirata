import React, { useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import PiratesService from '../services/pirates.services'
import { useHistory } from "react-router-dom";

const DetailPirate = () => {

    const { id } = useParams();
    const pirateService = new PiratesService();
    const [pirate, setPirate] = useState('');
    const history = useHistory();

    const getPirateFromService = async () => {
        try {
            const pirate = await pirateService.getOneSinglePirate(id);
            setPirate(pirate);
        } catch (err) {
            return err;
        }
    }

    useEffect(() =>{
        getPirateFromService();
    },[])

    const cambioPirata = async (id, pirate) => {
        try {
            const updatedPirateInService = await pirateService.updateExistingPirate(id, { ...pirate, pierna: true })
            getPirateFromService();
            return updatedPirateInService;
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {
                <div className="detail-container">
                    <div className="header-detail mt-3">
                        <h2>{pirate.name}</h2>
                    </div>
                    <div>
                    <h3>Frase: {pirate.frase}</h3>
                    </div>
                    <div className="pirate-detail mt-3">
                            <h3>About</h3>
                            <h3>Position: {pirate.puesto}</h3>
                            <h3>Treasure: {pirate.tesoros}</h3>
                            <h4>Peg Leg: {pirate.pierna ? 'Yes' : 'Yes'}</h4>
                            <h4>Eye Patch: {pirate.ojo ? 'Yes' : 'Yes'}</h4>
                            <h4>Hook Hand: {pirate.brazo ? 'No' : 'No'}</h4>
                    </div>
                    <div className="botones-container">
                        <Col>
                                <Button variant="danger" onClick= {()=> cambioPirata(pirate.pierna, pirate)}>No</Button>
                                <Button variant="danger" onClick= {()=> cambioPirata(pirate.ojo, pirate)}>No</Button>
                                <Button variant="success" onClick= {()=> cambioPirata(pirate.brazo, pirate)}>Yes</Button>
                        </Col>
                    </div>
                </div>
            }
        </div>
    )




}
    export default DetailPirate