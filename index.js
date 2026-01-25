import express from 'express';
import 'dotenv/config';
//const pool = require('./database');
const app = express();
const port = process.env.PORT;

const API_ENDPOINT = 'https://gisweb.newtonma.gov/server/rest/services/Data/MapServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=json';

app.use(express.json());

app.get('/update-database', async (request, response) => {
  const utilityPolesResponse = await fetch(API_ENDPOINT);
  const utilityPoles = await utilityPolesResponse.json();

  response.json(utilityPoles);
});

app.get('/', (request, response) => {
  response.json({info: 'homepage placeholder.'})
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});