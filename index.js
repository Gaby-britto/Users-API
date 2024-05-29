const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o módulo cors

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas as rotas

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
