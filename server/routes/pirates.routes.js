const  PiratesController = require('../controllers/pirates.controller')

module.exports = app => {
    app.get('/api/pirates', PiratesController.findAllPirates);
    app.put('/api/pirates/update/:id', PiratesController.updateExistingPirate);
    app.get('/api/pirates/:id', PiratesController.getPiratesByID);
    app.post('/api/pirates/new', PiratesController.createNewPirate);
    app.delete('/api/pirates/delete/:id', PiratesController.deleteExistingPirate);
}