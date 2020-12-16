require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('<h1>Servidor rest Jose Alfredo</h1>')
});

app.use(require('./Routes/usuario'));
app.use(require('./Routes/departamento'));
app.use(require('./Routes/empleado'));  

mongoose.connect('mongodb://localhost:27017/examen', {
    
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},(err, res) => {
 if(err) throw err;
 console.log('Base de datos ONLINE');
});
 
app.listen(process.env.PORT, () =>{
    console.log('El servidor esta en linea por el puerto', process.env.PORT);
});