import { FILEPATH } from './const.js';
import { readFile, writeFile } from './util.js';

class Storage {
	async saveKeyValue(key, value, path = FILEPATH) {
		try {
			let data = await readFile(path);
			data[key] = value;
			await writeFile(path, data);
			return data;
		} catch (err) {
			console.log(`Ошибка записи файла: ${err.message}`);
			return false;
		}
	}

	async getKeyValue(key, path = FILEPATH) {
		try {
			const data = await readFile(path);
			return data[key];
		} catch (err) {
			console.log(`Ошибка чтения файла: ${err.message}`);
			return false;
		}
	}
}

export { Storage };
