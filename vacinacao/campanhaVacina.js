const express = require('express');
const crypto = require('crypto');
// importa a api
const pool = require('./api');


// inicializa as rotas do express
const routerCampanhaVacina = express.Router();


// =============== CAMPANHA VACINA ================


// [GET] - Rota que lista todos as Vacinas em um campanha
routerCampanhaVacina.get('/', async (req, res) => {
  try {
      const campanhaVacina = await pool.query('SELECT * FROM CAMPANHAVACINA')
      res.send(campanhaVacina.rows)
  } catch (error) {
      console.error('Erro ao buscar quais vacinas foram tomadas', error)
      res.status(500).json({
          message: 'Erro durante a busca',
          data: error
      })
  }
})


//[POST] - Cadastro de vacina em uma campanha
routerCampanhaVacina.post('/add_campanhavacina', async (req, res) => {
  const nova_campanhaVacina  = req.body;

  if(!nova_campanhaVacina.id_vacina) {
    res.status(400).send('Está faltando dados');
    return;
  } 
  let id_campanha = 10
  const cadastroVacina = await pool.query('INSERT INTO CAMPANHAVACINA (ID_CAMPANHA, ID_VACINA) VALUES ($1, $2)', 
    [id_campanha, nova_campanhaVacina.id_vacina]
  )

  res.status(201).json({
    status: 'Vacina em campanha cadastrada com sucesso'
  });
})


// [DELETE] - Exclui vacina da campanha
routerCampanhaVacina.delete('/delete/:id_campanha/:id_vacina', async (req, res) => {
    //acesso o id via parametro
    const id_campanha = req.params.id_campanha
    const id_vacina = req.params.id_vacina
    const exclusao_vacinaCampanha = await pool.query('DELETE FROM CAMPANHAVACINA WHERE (ID_CAMPANHA, ID_VACINA) = ($1, $2)', [id_campanha, id_vacina]);

    res.json({
      message: 'Vacina em campanha excluido com sucesso'
    })
  })







module.exports =  routerCampanhaVacina;