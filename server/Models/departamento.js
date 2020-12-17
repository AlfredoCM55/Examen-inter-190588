const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    idjefearea: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El id es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    numempleados: {
        type: Number,
        required: [true, 'El num de empleados es requerido']
    },
    extensiontelefonica: {
        type: Number
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

module.exports = mongoose.model('Departamento', departamentoSchema)