import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath);

import { apiRouter } from './src/routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/*', async (req, res) => {
	res.sendFile('index.html', {root: path.join(__dirname, '..', 'client', 'build')});
});

app.listen(port, () => {
	console.log(`bird-scout listening on port ${port}`);
});