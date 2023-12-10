const express = require('express');
const crypto = require('crypto');
// importa a api
const pool = require('./../api');


// inicializa as rotas do express
const router = express.Router();


// [GET] - Rota que lista todos as vacinas aplicadas
router.get('/', async (req, res) => {
    try {
        const aplicadaBD = await pool.query('SELECT * FROM VACINAAPLICADA')
        res.send(aplicadaBD.rows)
    } catch (error) {
        console.error('Erro ao buscar quais vacinas foram tomadas', error)
        res.status(500).json({
            message: 'Erro durante a busca',
            data: error
        })
    }
})

// [GET] - Rota que retorna paciente por id
router.get('/:id', async (req, res) => {
    // recebo o id via req params
    const id = req.params.id;
    try {
        const pacientes = await pool.query('SELECT * FROM VACINAAPLICADA WHERE ID_PACIENTE = $1', [id])
        // verifico se existe o paciente, se nao existir devolvo um 404 com a mensagem "Paciente nao encontrado"
        if (pacientes.length === 0) {
            res.status(404).send('Paciente não encontrado')
        } else {
            // se encontrar o paciente devolve o paciente
            res.send(pacientes.rows)
        }
    } catch (error) {
        console.error('Erro ao buscar o paciente', error)
        res.status(500).json({
            message: 'Erro durante a busca',
            data: error
        })
    }
})

// [POST] - Cadastra uma nova vacina tomada
router.post('/add', async (req, res) => {
  const vacina_aplicada  = req.body;

  if(!vacina_aplicada.id_paciente || !vacina_aplicada.id_vacina || !vacina_aplicada.data_aplicacao) {
    res.status(400).send('Está faltando dados');
    return;
  } 
  
  const cadast = await pool.query('INSERT INTO VACINAAPLICADA (id_paciente, id_vacina, data_aplicacao) VALUES ($1, $2, $3)', 
    [vacina_aplicada.id_paciente, vacina_aplicada.id_vacina, vacina_aplicada.data_aplicacao]
  )

  res.status(201).json({
    status: 'Paciente vacinado cadastrado com sucesso'
  });
})

// [DELETE] - Exclui uma vacina tomada
router.delete('/delete/:id_paciente/:id_vacina', async (req, res) => {
    //acesso o id via parametro
    const id_paciente = req.params.id_paciente
    const id_vacina = req.params.id_vacina
    const exclusao_paciente = await pool.query('DELETE FROM VACINAAPLICADA WHERE (ID_PACIENTE, ID_VACINA) = ($1, $2)', [id_paciente, id_vacina]);

    res.json({
      message: 'Paciente excluido com sucesso'
    })
  })


module.exports = router;