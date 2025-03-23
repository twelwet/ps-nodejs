import express from 'express';
import path from 'path';
import { mainRouter } from './routes/main.js';
import { settingsRouter } from './routes/settings.js';
import { PORT } from './const.js';

const port = PORT;
const app = express();

app.set(`views`, `./templates`);
app.set(`view engine`, `pug`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('__dirname', '../public')));

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});

app.use('/', mainRouter);
app.use ('/settings', settingsRouter);

app.use((req, res) => {
	res.status(404).render(`errors/404`);
});

app.use((err, req, res, next) => {
	res.status(500).render(`errors/500`);
});
