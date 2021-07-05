const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const PiratesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'No puede crear un pirata sin nombre'],
        maxLength: [20, 'No debe excer los 15 caracteres']
    },
    puesto: {
        type: String,
        required: [true, 'No se puede crear pirata sin posición']
    },
    tesoros: {
        type: Number,
        required: [true, 'No puede enviar un producto descripcion']
    },
    frase: {
        type: String,
        required: [true, 'No puede enviar una frase vacía'],
        maxLength: [50, 'No debe excer los 50 caracteres']
    }, 
    pierna: {
        type: Boolean,
        default: true
        // required: [true, 'Este es un campo requerido'],
    },   
    ojo: {
        type: Boolean,
        default: true
        // required: [true, 'Este es un campo requerido'],
    },   
    brazo: {
        type: Boolean,
        default: true
        // required: [true, 'Este es un campo requerido'],
    }, 
},
{timestamps: true}
);

const Pirates = mongoose.model('Pirates', PiratesSchema);
module.exports = Pirates;
PiratesSchema.plugin(uniqueValidator);




