import express from 'express';
import path from 'path';

const app = express();

app.set(`views`, `./templates`);
app.set(`view engine`, `pug`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('__dirname', '../public')));

export { app };
