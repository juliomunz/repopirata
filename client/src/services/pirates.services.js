import axios from 'axios';

export default class PiratesService {

    constructor (){}

    async getOneSinglePirate (id){
        try {
            const pirate = await axios.get(`http://localhost:8000/api/pirates/${id}`);
            return pirate.data.pirateData;
        } catch (err) {
            return err;
        }
    }
    
    async findAllPirates() {
        try {
            const piratesList = await axios.get(`http://localhost:8000/api/pirates`);
            //console.log(petsList)
            return piratesList.data.pirates;
        } catch (err) {
            return err;  
        }
    }
    async createNewPirate(pirate) {
        try {
            const newPirate = await axios.post(`http://localhost:8000/api/pirates/new`, pirate);
            console.log(newPirate)
                    return newPirate.data.pirate;
                }
        catch (err) 
        {
            //console.log(err.response)
            return err.response;
        }
    }

    async updateExistingPirate(id, pirate){
        try {
            const updatePirate = await axios.put(`http://localhost:8000/api/pirates/update/${id}`, pirate);
            return updatePirate.data.pirate;
        } catch (err) {
            return err;
        }
    }

    async deletePirate(id){
        try {
            const deletePirate = await axios.delete(`http://localhost:8000/api/pirates/delete/${id}`);
            return deletePirate.data.pirateDeleted;
        } catch (err) {
            return err;
            
        }
    }
}