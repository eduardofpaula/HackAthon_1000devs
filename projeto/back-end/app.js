//API importar express
const express = require('express');
const cors = require('cors');
const rotaPaciente = require('../routes/paciente')
//const rotaVacina = require('./rotas/vacina.js')

//inicializa um servidor web com express
const app = express();

//inicializa cors
app.use(cors())

//fala pro express utilizar o middleware para trabalharmos com json
app.use(express.json());

app.use('/paciente', rotaPaciente);
//app.use('/vacina', rotaVacina);

//defina uma porta de rede para rodar o meu servidor web
const port = 3000;
//testar pra ver se esta funcionando
app.listen(port, () => {
    console.log('Esta rodando')
} )
