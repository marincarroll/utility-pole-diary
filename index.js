const express = require('express');
//const pool = require('./database');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});