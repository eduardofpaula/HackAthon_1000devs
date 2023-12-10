const express = require('express');

//importa a conexao com o banco
const pool = require('../back-end/database/api');

//inicializa o express
const rotaPaciente = express.Router();

/*rota para listar todos os pacientes*/
rotaPaciente.get('/', async (req, res) => {
    
    console.log("=> endpoint /paciente requisitado");
    
    try {
        //executa a consulta o banco de dados
        const consulta = await pool.query('SELECT * FROM paciente'); 
        
        //retorna o status HTTP 200 com os dados obtidos do banco 
        res.status(200).send(consulta.rows);
    } catch (error) {  
        //em caso de qualquer erro apresenta a descricao do erro
        console.log(error); 
        //retorna o status HTPP 400 com a mensagem de erro customizada
        res.status(404).json({mensagem: 'Erro ao executar a consulta.'});
    }
})

/*rota para listar pacientes por id*/
rotaPaciente.get('/:id', async (req, res) => {
    //obtem o parametro
    const id = req.params.id;

    console.log(`=> endpoint /paciente/${id} requisitado`);

    try {
        const paciente = await pool.query('SELECT * FROM paciente WHERE id_paciente = $1', [id]);

        //verifica se retornou alguma linha do banco de dados
        if (paciente.rowCount > 0){
            //se retornou devolve os dados com o status 200
            res.status(200).send(paciente.rows);
        } else {
            //caso nao retorne nenhuma linha o id nao existe
            res.status(404).json({mensagem: 'Paciente nao encontrado.'})
        }
    } catch (error) {    
        console.log(error);
        res.status(404).json({mensagem: 'Erro ao executar a consulta.'});
    }

})

/*rota para adicionar um paciente*/
rotaPaciente.post('/add',async (req, res) => {
    console.log(`=> endpoint /paciente/add/ requisitado`);

    //obtem os dados no corpo da requisicao HTTP
    const paciente = req.body;

    try {
        //verifica se esta faltando algum campo obrigatorio
        if (!paciente || !paciente.nome || !paciente.data_nascimento) {
            res.status(400).json({mensagem: 'Parametros incompletos.'})
        } else {
            //campo ok, monta o SQL
            sqlString = `INSERT INTO paciente (id_paciente, nome, data_nascimento) `;
            sqlString += ` VALUES ($3, $1, $2)`
            
            //desafio: pense em como descobrir o maior valor existente na coluna id_paciente ai basta somar + 1 
            let id = 20; //deixei fixo apenas para teste
            const result = await pool.query( sqlString, [paciente.nome, paciente.data_nascimento, id] );

            if (result.rowCount > 0) {
                res.status(201).json({mensagem: 'Paciente cadastrado com sucesso.'});
            } else {
                res.status(400).json({mensagem: 'Erro ao inserir paciente.'});
            }
        }
    } catch (error) {  
        console.log(error);
        res.status(404).json({mensagem: 'Erro ao executar a insercao.'});
    }
})

/*rota para excluir um paciente*/
rotaPaciente.delete('/delete/:id',async (req, res) => {
    const id = req.params.id;

    console.log(`=> endpoint /paciente/delete/${id} requisitado`);

    try {
        const result = await pool.query(`DELETE FROM paciente WHERE id_paciente = $1`, [id] );

        if (result.rowCount > 0){
            res.status(200).json({mensagem: 'Paciente excluido com sucesso.'});
        } else {
            res.status(404).json({mensagem: 'Paciente nao encontrado.'});
        }
    } catch (error) {  
        console.log(error);
        res.status(404).json({mensagem: 'Erro ao executar a exclusao.'});
    }
})

/*rota para para atualizar um paciente por id*/
rotaPaciente.put('/update/:id',async (req, res) => {
    const id = req.params.id;
    const pacienteEditado = req.body;

    console.log(`=> endpoint /paciente/update/${id} requisitado`);

    //para montarmos o sql dinamicamente com os campos que vieram do formulario
    //usamos o Object.Keys para obter o nome dos campos do formulario
    const campos = Object.keys(pacienteEditado);
    
    //usamos o Object.Keys para obter os valores dos campos do formulario
    const valores = Object.values(pacienteEditado);
    
    //montamos a clausula set do sql com o nome dos campos
    const sqlSetString = campos.map((field, index) => 
                                        `${field} = $${index + 1}`
                                    ).join(', ');

    console.log(`   Campos recebidos: ${campos}`);
    console.log(`   Valores recebidos: ${valores}`);
    console.log(`   Clausula SET: ${sqlSetString}`);
    
    try{
        const result = await pool.query(
            `UPDATE paciente SET ${sqlSetString} WHERE id_paciente = $${campos.length + 1}`,
            [...valores, Number(id)]
        );

        if (result.rowCount > 0){
            res.status(201).json({mensagem: 'Paciente atualizado com sucesso.'})
        } else {
            res.status(404).json({mensagem: 'Paciente nao encontrado.'});
        }
    } catch (error) {  
        console.log(error);
        res.status(404).json({mensagem: 'Erro ao executar a atualizacao.'});
    }
})

//exporta a rota para permitir a importacao em outros arquivos
module.exports = rotaPaciente; 