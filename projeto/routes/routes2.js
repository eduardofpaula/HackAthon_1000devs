import express from "express";
import database from "../../api.js";

const router = express.Router();

    router.post('/cadastrar_vacina', async (req, res) => {
        const dadosVacina = req.body;

        if (
            !dadosVacina.VACINA ||
            !dadosVacina.SIGLA_VACINA ||
            !dadosVacina.DOENCA_PROTECAO ||
            !dadosVacina.DOSE ||
            !dadosVacina.ID_REDE
        ) {
           res.status(400).send({ erro: 'Todos os parâmetros são obrigatórios.' });
           return;
        }
    
    
        try {
            
            const result = await database.run(
                'INSERT INTO vacina (vacina, sigla_vacina, doenca_protecao, dose, id_rede) VALUES ($1, $2, $3, $4, $5)',
                [dadosVacina.vacina, dadosVacina.sigla_vacina, dadosVacina.doenca_protecao, dadosVacina.dose, dadosVacina.id_rede]
            );
    
            res.status(201).json({ status: 'Produto cadastrado com sucesso',
            data: rows });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao cadastrar a vacina.' });
        }
    });
    