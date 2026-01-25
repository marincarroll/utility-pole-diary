import express from 'express';
import 'dotenv/config';
const app = express();
const port = process.env.PORT;


app.use(express.json());

/*
app.get('/update-database', async (request, response) => {

  response.json(utilityPoles);
});*/

app.get('/', (request, response) => {
  response.json({info: 'homepage placeholder.'})
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});