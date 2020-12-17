const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let empleadoSchema = new Schema({
    idusuario: {
       type: Schema.Types.ObjectId,
       required: [true, 'El id es necesario'],
       ref: 'Usuario'
    },
    iddepartamento: {
        type: Schema.Types.ObjectId,
        required: [true, 'El id es necesario'],
        ref: 'Departamento'
      
    },
    nombredelpuesto: {
        type: String,
       
    },
    aniosservicio: {
        type: Number,
       
    },
    horaentrada: {
        type: Number,
       
    },
    horasalida: {
        type: Number,
     
        
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

module.exports = mongoose.model('Empleado', empleadoSchema);