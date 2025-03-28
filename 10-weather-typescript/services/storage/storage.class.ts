import { FILEPATH } from './const.js';
import { logger } from '../services.js';
import { readFile, writeFile } from './util.js';
import { paramKey, IData } from '../../types.js';

class Storage {
	async getKeyValue(key: paramKey, path: string = FILEPATH): Promise<string | false> {
		try {
			const data = await readFile(path);
			if (typeof data === 'object' && data.hasOwnProperty(key)) {
				return data[key];	
			}
			return false;
		} catch (err) {
			if (err instanceof Error) {
				logger.printError(`Ошибка чтения файла: ${err.message}`);
			}
			return false;
		}
	}

	async saveKeyValue(key: paramKey, value: string, path: string = FILEPATH): Promise<IData | false> {
		try {
			const data = await readFile(path);
			if (typeof data === 'object') {
				data[key] = value;
				await writeFile(path, data);
			}
			if (!data) {
				const newData: IData = { city: '', token: '' };
				newData[key] = value;
				await writeFile(path, newData);
			}
			logger.printSuccess(`Задан ${key}: '${value}'`);
			return data;
		} catch (err) {
			if (err instanceof Error) {
				logger.printError(`Ошибка записи файла: ${err.message}`);
			}
			return false;
		}
	}

}

export { Storage };
