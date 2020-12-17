const express = require('express')
const Empleado = require('../Models/empleado');
const _ = require('underscore');
const app = express();


app.get('/empleado', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;  
    
    Empleado.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('idusuario' ,'nombre papellido sapellido')
    .populate('iddepartamento' ,'nombre numempleados extenciontelefonica')
    .exec((err, empleado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Lista de usuarios obtenida con exito',
            conteo: empleado.length,
            empleado
    
        });
    });
});

app.post('/empleado', function(req, res) {
    let body = req.body;
    let em = new Empleado ({
        idusuario: body.idusuario,
        iddepartamento: body.iddepartamento,
        nombredelpuesto: body.nombredelpuesto,
        aniosservicio: body.aniosservicio,
        horaentrada: body.horaentrada,
        horasalida: body.horasalida,
        activo: body.activo
    });

    em.save((err, emDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
                
        res.json({
            ok:true,
            msg: 'Empleado insertado con exito',
            emDB
        });
    });
});

app.put('/empleado/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['idusuario']);

    Empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, emDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Empleado actualizado con exito',
                empleado: emDB
            });
        });
});

app.delete('/empleado/:id', function(req, res) {
  
    let id = req.params.id;

    Empleado.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, emDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al eliminar empleado',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Empleado eliminado con exito',
            emDB
        });
    });
});

module.exports = app;