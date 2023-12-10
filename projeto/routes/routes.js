import express from "express";
import database from "../../api.js";

const router = express.Router();

//rota pra todas as vacinas
const listarInformacoesVacina = async () => {
  const result = await database.query(
    `SELECT * from vacina LEFT JOIN rede ON vacina.id_rede = rede.id_rede LEFT JOIN periodoaplicacaoano ON vacina.id_vacina = periodoaplicacaoano.id_vacina LEFT JOIN periodoaplicacaomes ON vacina.id_vacina = periodoaplicacaomes.id_vacina`
  );
  return result.rows;
};
router.get("/consultaVacina", async (req, res) => {
  try {
    const informacoes = await listarInformacoesVacina();
    return res.send({ informacoes });
  } catch (error) {
    console.error("Erro ao buscar vacina", error);
    res.status(500).json({
      message: "Erro durante a busca",
      data: error,
    });
  }
});

//rota que retorna uma vacina por nome
const consultaVacina = async (vacina) => {
  const query = {
    text: "SELECT * from vacina LEFT JOIN rede ON vacina.id_rede = rede.id_rede LEFT JOIN periodoaplicacaoano ON vacina.id_vacina = periodoaplicacaoano.id_vacina LEFT JOIN periodoaplicacaomes ON vacina.id_vacina = periodoaplicacaomes.id_vacina WHERE vacina ILIKE $1",
    values: [`%${vacina}%`],
  };
  const result = await database.query(query);
    return result.rows;
  
};

router.get("/consultaVacina/:vacina", async (req, res) => {
  try {
    const { vacina } = req.params;

    const resultado = await consultaVacina(vacina);
    return res.send({ vacina: resultado });
  } catch (error) {
    console.error("Erro ao buscar vacina", error);
    res.status(500).json({
      message: "Erro durante a busca",
      data: error,
    });
  }
});

//rota pra uma idade exata
const consultaPorAnoExato = async (idade) => {
  const query = {
    text: `SELECT
        periodoaplicacaoano.id,
        periodoaplicacaoano.id_vacina,
        periodoaplicacaoano.qtd_ano_inicial,
        periodoaplicacaoano.qtd_ano_final,
        periodoaplicacaoano.desc_ano,
        periodoaplicacaomes.qtd_meses_inicial,
        periodoaplicacaomes.qtd_meses_final,
        periodoaplicacaomes.desc_meses,
        vacina.*
        
    FROM
    periodoaplicacaoano
    LEFT JOIN
    periodoaplicacaomes ON periodoaplicacaoano.id_vacina = periodoaplicacaomes.id_vacina
    LEFT JOIN
        vacina ON periodoaplicacaoano.id_vacina = vacina.id_vacina
    WHERE
    periodoaplicacaoano.qtd_ano_final = $1 AND periodoaplicacaoano.qtd_ano_inicial = $1`,
    values: [idade],
  };
  const result = await database.query(query);
  
    return result.rows;
  
};

router.get("/consultaporanoexato/:idade", async (req, res) => {
  try {
    const { idade } = req.params;
    const resultado = await consultaPorAnoExato(idade);
    return res.send({ idade: resultado });
  } catch (error) {
    console.error("Erro ao buscar vacina", error);
    res.status(500).json({
      message: "Erro durante a busca",
      data: error,
    });
  }
});

//rota por mês exato
const consultaPorMesExato = async (idade) => {
  const query = {
    text: `SELECT
        periodoaplicacaomes.qtd_meses_inicial,
        periodoaplicacaomes.qtd_meses_final,
        periodoaplicacaomes.desc_meses,
        vacina.*
        
    FROM
    periodoaplicacaomes
LEFT JOIN
        vacina ON periodoaplicacaomes.id_vacina = vacina.id_vacina
    WHERE
    periodoaplicacaomes.qtd_meses_final = $1 AND periodoaplicacaomes.qtd_meses_inicial = $1`,
    values: [idade],
  };
  const result = await database.query(query);
  
    return result.rows;
  
};

router.get("/consultapormesexato/:idade", async (req, res) => {
  try {
    const { idade } = req.params;

    const resultado = await consultaPorMesExato(idade);
    return res.send({ idade: resultado });
  } catch (error) {
    console.error("Erro ao buscar vacina", error);
    res.status(500).json({
      message: "Erro durante a busca",
      data: error,
    });
  }
});

const consultaPorMeses = async (idade) => {
  const query = {
    text: `SELECT
            periodoaplicacaomes.qtd_meses_inicial,
            periodoaplicacaomes.qtd_meses_final,
            periodoaplicacaomes.desc_meses,
            vacina.*
            
        FROM
        periodoaplicacaomes
    LEFT JOIN
            vacina ON periodoaplicacaomes.id_vacina = vacina.id_vacina
        WHERE
        periodoaplicacaomes.qtd_meses_final <= $1 `,
    values: [idade],
  };
  const result = await database.query(query);

    return result.rows;
  
};
router.get("/consultapormeses/:idade", async (req, res) => {
  try {
    const { idade } = req.params;

    const resultado = await consultaPorMeses(idade);
    return res.send({ idade: resultado });
  } catch (error) {
    console.error("Erro ao buscar vacina", error);
    res.status(500).json({
      message: "Erro durante a busca",
      data: error,
    });
  }
});

const consultaPorAnos = async (idade) => {
  const query = {
    text: `SELECT
                periodoaplicacaoano.id,
                periodoaplicacaoano.id_vacina,
                periodoaplicacaoano.qtd_ano_inicial,
                periodoaplicacaoano.qtd_ano_final,
                periodoaplicacaoano.desc_ano,
                periodoaplicacaomes.qtd_meses_inicial,
                periodoaplicacaomes.qtd_meses_final,
                periodoaplicacaomes.desc_meses,
                vacina.*
                
            FROM
            periodoaplicacaoano
            LEFT JOIN
            periodoaplicacaomes ON periodoaplicacaoano.id_vacina = periodoaplicacaomes.id_vacina
            LEFT JOIN
                vacina ON periodoaplicacaoano.id_vacina = vacina.id_vacina
            WHERE
            periodoaplicacaoano.qtd_ano_final <= $1`,
    values: [idade],
  };
  const result = await database.query(query);
  
    return result.rows;
  
};
router.get("/consultaporanos/:idade", async (req, res) => {
  try {
    const { idade } = req.params;

    const resultado = await consultaPorAnos(idade);
    return res.send({ idade: resultado });
  } catch (error) {
    console.error("Erro ao buscar vacina", error);
    res.status(500).json({
      message: "Erro durante a busca",
      data: error,
    });
  }
});

export default router;
