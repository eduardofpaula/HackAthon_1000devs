//importamos o express
const express = require('express');
const cors = require('cors');
// importo as rotas da aplicacao;
const router = require('./routes/routes.js');
const routerCampanhaVacina = require('./campanhaVacina.js');

// inicializo a minha instancia do express;
const app = express();


// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger_output.json");

// app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.use(cors());
// habilito o midleware de json do express;
app.use(express.json());

// inicializa a rota de acordo com as configuracoes do meu arquivo de rotas;
app.use('/campanha', router);
app.use('/campanhavacina', routerCampanhaVacina);

//configuro a porta do projeto e a sua exposicao.
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})