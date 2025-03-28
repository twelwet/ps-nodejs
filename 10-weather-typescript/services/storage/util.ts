import { promises } from 'node:fs';
import { IData } from '../../types';

const readFile = async (path: string): Promise<IData | false> => {
	try {
		const file = await promises.readFile(path);
		return JSON.parse(file.toString());
	} catch (err) {
		return false;
	}
};

const writeFile = async (path: string, data: IData): Promise<boolean> => {
	try {
		await promises.writeFile(path, JSON.stringify(data));
		return true;
	} catch(err) {
		return false;
	}
};

export { readFile, writeFile };
