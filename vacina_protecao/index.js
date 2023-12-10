//importamos o express
const express = require('express');
const cors = require('cors');
// importo as rotas da aplicacao;
const router = require('./routes/routes.js');

// inicializo a minha instancia do express;
const app = express();


app.use(cors());
// habilito o midleware de json do express;
app.use(express.json());

// inicializa a rota de acordo com as configuracoes do meu arquivo de rotas;
app.use('/vacina', router);


//configuro a porta do projeto e a sua exposicao.
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})