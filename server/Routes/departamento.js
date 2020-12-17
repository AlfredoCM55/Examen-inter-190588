const express = require('express')
const Departamento = require('../Models/departamento');
const _ = require('underscore');
const app = express();


app.get('/departamento', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;  

    Departamento.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('idjefearea', 'nombre papellido sapellido')
    .exec((err, departamento) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar el departamento',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Listado de departamentos obtenida con exito',
            conteo: departamento.length,
            departamento
    
        });
    });
});

app.post('/departamento', function(req, res) {
    let body = req.body;
    let dp = new Departamento ({
        idjefearea: body.idjefearea,
        nombre: body.nombre,
        numempleados: body.numempleado,
        extensiontelefonica: body.extensiontelefonica,
        activo: body.activo
    });

    dp.save((err, dpDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }

        res.json({
            ok:true,
            msg: 'Departamento insertado con exito',
            dpDB
        });
    });
});

app.put('/departamento/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'idjefearea','numempleados', 'extensiontelefonica']);

    Departamento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, dpDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Departamento actualizado con exito',
                departamento: dpDB
            });
        });
});

app.delete('/departamento/:id', function(req, res) {
  
    let id = req.params.id;

    Departamento.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, dpDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar un Departamento',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Departamento eliminado con exito',
            dpDB
        });
    });
});

module.exports = app;