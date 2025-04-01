import { FILEPATH } from './const.js';
import { logger } from '../services.js';
import { readFile, writeFile } from './util.js';
import { paramKey, IData } from '../../types.js';

class Storage {
	async getKeyValue(key: paramKey, path: string = FILEPATH): Promise<string | null> {
		try {
			const data = await readFile(path);
			return data ? data[key] : data;
		} catch (err) {
			if (err instanceof Error) {
				logger.printError(`Ошибка чтения файла: ${err.message}`);
			}
			return null;
		}
	}

	async saveKeyValue(key: paramKey, value: string, path: string = FILEPATH): Promise<boolean> {
		try {
			const data = await readFile(path);
			switch (data) {
				case null:
					const newData: IData = { city: '', token: '' };
					newData[key] = value;
					logger.printSuccess(`Задан ${key}: '${value}'`);
					return await writeFile(path, newData);
				default:
					data[key] = value;
					logger.printSuccess(`Задан ${key}: '${value}'`);
					return await writeFile(path, data);
			}
		} catch (err) {
			if (err instanceof Error) {
				logger.printError(`Ошибка записи файла: ${err.message}`);
			}
			return false;
		}
	}

}

export { Storage };
