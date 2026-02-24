import express from 'express';
import 'dotenv/config';
import { prisma } from './lib/prisma';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', async (request, response) => {
  const poles = await prisma.utilityPole.findMany();
   response.json(poles);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});