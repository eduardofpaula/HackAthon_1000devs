import express from 'express';
import cors from 'cors';
import vacinaRouter from './projeto/routes/routes.js';



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', vacinaRouter);


const PORTA = 5000;
app.listen(PORTA, () => {
  console.log(`servidor rodando na porta ${PORTA}`);
});