//import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import React, { useEffect, useState } from 'react';
import PiratesService from '../services/pirates.services'
import { Link } from 'react-router-dom';

const Mispiratas = () => {
    const [pirates, setPirates] = useState([])
    const piratesService = new PiratesService;


    const getAllPiratesFromService = async ()=>{
        try {
            const piratesList = await piratesService.findAllPirates();
            setPirates(piratesList);
            //console.log(piratesList);
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    useEffect(() => {
        getAllPiratesFromService();
    }, []);


    const deletePirate = async (id)=> { 
        try{
            await piratesService.deletePirate(id)
            getAllPiratesFromService();
        }
        catch(err){
            return err;
        } 
    }

return(
    <div className="container">
        <div className="header-pirates mt-3">
            <h1>Pirate Crew</h1>
            <Link to="/pirate/new">
                <Button type="button" class="primary">Add Pirate </Button>
            </Link>
        </div>
        <div>
            <div className="pirates-container">
                <ul>
                    {
                        pirates.length > 0 ? (
                            pirates.map((pirate) => (
                                    <li key={pirate._id} className="card">
                                        <p>{pirate.name}</p>
                                        <div className="acctions-container">
                                            <Link to={`/pirates/${pirate._id}`}>
                                                <Button variant="primary">View Pirate</Button>
                                            </Link>
                                                <Button variant="danger" onClick={() => deletePirate(pirate._id)}>Walk the Plank</Button>
                                        </div>
                                    </li>
                                ))
                                ) : 'No hay piratas a bordo'
                            }
                </ul>
            </div>
        </div>
    </div>    
    )
}

export default Mispiratas