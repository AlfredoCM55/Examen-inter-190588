const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    papellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    sapellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    edad: {
    type: Number,
    required: [true, 'La edad es necesario'],
    },
    curp: {
        type: String,
        required: [true, 'La contraseña es necesario'],
        unique: true
    },
    telefono: {
        type: Number,
        required: [true, 'El numero es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    estado: {
        type: Boolean,
        default: true
        }
 
});

module.exports = mongoose.model('Usuario', usuarioSchema);