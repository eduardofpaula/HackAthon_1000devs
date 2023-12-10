const express = require('express');
const crypto = require('crypto');
// importa a api
const pool = require('./../api');


// inicializa as rotas do express
const router = express.Router();


// [GET] - Rota que lista todos as campanhas
router.get('/', async (req, res) => {
    try {
        const campanha = await pool.query('SELECT * FROM CAMPANHA')
        res.send(campanha.rows)
    } catch (error) {
        console.error('Erro ao buscar campanhas', error)
        res.status(500).json({
            message: 'Erro durante a busca',
            data: error
        })
    }
})

// [GET] - Pesquisa campanha por data
router.get('/pesquisadata/:data', async (req, res) => {
  const data = req.body.data
  try {
    if (!data.data_inicio || data.data_fim){
      res.status(400).send('Está faltando dados');
      return;
    }
      const pesquisaData = await pool.query(`SELECT * FROM CAMPANHA WHERE (data_inicio, data_fim) ILEKE '%${data}%'`)
      res.send(pesquisaData.rows)
  } catch (error) {
      console.error('Erro ao buscar campanha por data', error)
      res.status(500).json({
          message: 'Erro durante a busca',
          data: error
      })
  }
})


// [GET] - Campanha atraves da proteção da vacina
// ex = /campanha/protecao/febre
router.get('/protecao/:vacina', async (req, res) => {
  const vacina = req.params.vacina;
  try {
      const pesquisa = await pool.query(`SELECT * FROM CAMPANHA WHERE DESCRICAO ILIKE '%${vacina}%'`)
      res.send(pesquisa.rows)
  } catch (error) {
      console.error('Erro ao buscar proteção da vacina', error)
      res.status(500).json({
          message: 'Erro durante a busca'
      })
  }
})


//[POST] - Cadastra uma nova campanha
router.post('/add_campanha', async (req, res) => {
  const nova_campanha  = req.body;

  if(!nova_campanha.descricao || !nova_campanha.data_inicio || !nova_campanha.data_fim) {
    res.status(400).send('Está faltando dados');
    return;
  } 
  let id_campanha = 10
  const cadastro = await pool.query('INSERT INTO CAMPANHA (id_campanha, descricao, data_inicio, data_fim) VALUES ($1, $2, $3, $4)', 
    [id_campanha, nova_campanha.descricao, nova_campanha.data_inicio,nova_campanha.data_fim]
  )

  res.status(201).json({
    status: 'Campanha cadastrada com sucesso'
  });
})


// [PUT] Atualizacao de Campanha
router.put('/update/:id',async (req, res) => {
  const id = req.params.id;
  const campanhaEditada = req.body;

  //para montarmos o sql dinamicamente com os campos que vieram do formulario
  //usamos o Object.Keys para obter o nome dos campos do formulario
  const campos = Object.keys(campanhaEditada);
  
  //usamos o Object.Keys para obter os valores dos campos do formulario
  const valores = Object.values(campanhaEditada);
  
  //montamos a clausula set do sql com o nome dos campos
  const sqlSetString = campos.map((field, index) => 
                                      `${field} = $${index + 1}`
                                  ).join(', ');

  try{
      const result = await pool.query(
          `UPDATE CAMPANHA SET ${sqlSetString} WHERE id_campanha = $${campos.length + 1}`,
          [...valores, Number(id)]
      );

      if (result.rowCount > 0){
          res.status(201).json({mensagem: 'Campanha atualizada com sucesso.'})
      } else {
          res.status(404).json({mensagem: 'Campanha nao encontrada.'});
      }
  } catch (error) {  
      console.log(error);
      res.status(404).json({mensagem: 'Erro ao executar a atualizacao.'});
  }
})



module.exports = router;