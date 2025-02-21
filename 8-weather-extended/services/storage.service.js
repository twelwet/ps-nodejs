import { promises } from 'fs';
import path from 'path';
import { printError, printSuccess } from './log.service.js';

const FILENAME = 'weather-data.json';
const FILEPATH = path.join(path.resolve('__dirname', '..'), FILENAME);

const readFile = async (path) => {
	try {
		const file = await promises.readFile(path);
		return JSON.parse(file);
	} catch (err) {
		return {};
	}
};

const saveKeyValue = async (key, value, path = FILEPATH) => {
	try {
		let data = await readFile(path);
		data[key] = value;
		await promises.writeFile(path, JSON.stringify(data));
		printSuccess('Сохранено');
		return data;
	} catch (err) {
		printError(`Ошибка записи файла: ${err.message}`);
		return false;
	}
};

const getKeyValue = async (key, path = FILEPATH) => {
	try {
		const data = await readFile(path);
		return data[key];
	} catch (err) {
		printError(`Ошибка чтения файла: ${err.message}`);
		return false;
	}
};

export { saveKeyValue, getKeyValue };
