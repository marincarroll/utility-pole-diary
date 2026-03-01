import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma } from './lib/prisma';

const app = express();

const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get('/poles', async (request, response) => {
    const poles = await prisma.utilityPole.findMany();
    response.json(poles);
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});