import { promises } from 'fs';

const readFile = async (path) => {
	try {
		const file = await promises.readFile(path);
		return JSON.parse(file);
	} catch (err) {
		return {};
	}
};

const writeFile = async (path, data) => {
	try {
		await promises.writeFile(path, JSON.stringify(data));
		return true;
	} catch(err) {
		return false;
	}
}

export { readFile, writeFile };
