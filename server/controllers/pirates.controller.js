const Pirates = require('../model/pirates.model');

module.exports.findAllPirates = (req, res) => {
    Pirates.find()
    .then(allPirates => res.json({pirates: allPirates}))
    .catch(err => res.json({pirates: null}));
}

module.exports.createNewPirate = (req, res) => {
    //console.log('llegue aqui',req.body);
    Pirates.create(req.body)
    .then(newPirate => res.send({pirate: newPirate}))
    .catch(err => res.send({errors: err}));
}

module.exports.getPiratesByID = (req, res) => {
    Pirates.findById(req.params.id)
    .then(singlePirate => res.json({pirateData: singlePirate}))
    .catch(error => res.json({pirateData: null}));
}

module.exports.updateExistingPirate = (req, res) => {
    Pirates.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatePirate => res.json({ pirate: updatePirate }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteExistingPirate = (req, res) => {
    Pirates.findByIdAndDelete({ _id: req.params.id })
        .then(deletePirate => res.json({ pirateDeleted: deletePirate }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};