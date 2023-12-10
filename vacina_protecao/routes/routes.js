const express = require('express');
// importa a api
const pool = require('./../api');


// inicializa as rotas do express
const router = express.Router();

// [GET] - Rota que lista todos as vacinas
router.get('/', async (req, res) => {
    try {
        const aplicadaBD = await pool.query('SELECT * FROM VACINA')
        res.send(aplicadaBD.rows)
    } catch (error) {
        console.error('Erro ao buscar vacinas', error)
        res.status(500).json({
            message: 'Erro durante a busca',
            data: error
        })
    }
})

// [GET] - Pesquisa de vacina por proteção
router.get('/protecao', async (req, res) => {
    try {
        const pesquisa = await pool.query('SELECT * FROM VACINA WHERE DOENCA_PROTECAO')
        res.send(pesquisa.rows)
    } catch (error) {
        console.error('Erro ao buscar vacina por proteção', error)
        res.status(500).json({
            message: 'Erro durante a busca'
        })
    }
})


module.exports = router;