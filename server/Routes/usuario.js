const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../Models/usuario');
const app = express();
  
  app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;  
    Usuario.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) => {
      if(err){
        return res.status(400).json({
          ok: false,
          msg: 'Ocurrio un error al momento de consultar',
          err
        })
      }

      res.json({
        ok: true,
        msg: 'Lista de usuarios obtenida con exito',
        conteo: usuarios.length,
        usuarios
      })
    });
  });
  
  app.post('/usuario', function (req, res) {
    let body = req.body;
    let usr = new Usuario({
      nombre: body.nombre, 
      papellido: body.papellido,
      sapellido: body.sapellido,
      edad: body.edad,
      curp: body.curp,
      telefono: body.telefono,
      email: body.email

    });

    usr.save((err, usrDB) =>{
      if(err){
        return res.status(400).json({
          ok: false,
          msg: 'Ocurrio un error',
          err
        });
      }
      res.json({
        ok: true,
        msg: 'Usuario insertado con exito',
        usrDB
      });
    });
  });
  
  app.put('/usuario/:id', function (req, res) {
   let id = req.params.id;
   let body = _.pick(req.body, ['nombre', 'papellido', 'sapellido']);

   Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, 
   (err, usrDB) => {
    if(err){
      return res.status(400).json({
        ok: false,
        msg: 'Ocurrio un error al momento de actualizar',
        err
      });
    }
    res.json({
      ok: true,
      msg: 'Usuario actualizado con exito',
      usuario: usrDB
    });
   });
  });
  
  app.delete('/usuario/:id', function(req, res){

   let id = req.params.id;
   Usuario.findByIdAndUpdate(id, {estado: false}, {new: true, runValidators: true, context: 'query'}, (err, usrDB) => {
    if(err){
      return res.status(400).json({
        ok: false,
        msg: 'Ocurrio un error al momento de eliminar',
        err
      });
    }
    res.json({
      ok: true,
      msg: 'Usuario eliminado con exito',
      usrDB
    });
   });
  });

  module.exports = app;