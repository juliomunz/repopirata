const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const {Schema} = mongoose

const UserSchema = new Schema({
    nombre: { 
        type: String,
        unique: [true, "Name ya existe, intente con uno diferente"],
        // required: [true, "Nombre es requerido"],
        lowercase: true, 
        maxLength: [10, 'No debe superar los 10 caracteres' ]
     },
     apellido: { 
        type: String,
        // required: [true, "Nombre es requerido"],
        lowercase: true, 
        maxLength: [10, 'No debe superar los 10 caracteres' ]
     },
    correo: { 
        type: String,
        required:  [true, "Correo es requerido"],
        unique: [true, "Email ya existe, intente con uno diferente"]
    },
    contrasena: {
        type: String,
        required: [true, "Contraseña es requerida"]
     }
}, 
    { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
UserSchema.plugin(uniqueValidator);