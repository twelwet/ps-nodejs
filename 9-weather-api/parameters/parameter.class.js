import { storage } from "../services/services.js";

class Parameter {
	constructor(key) {
		this.key = key;
	}

	async save(value) {
		await storage.saveKeyValue(this.key, value);
		console.log(`Задан ${this.key}: '${value}'`);
	}

	async read() {
		const value = await storage.getKeyValue(this.key);
		if (!value || value.length === 0) {
			return false;
		}
		return value;
	}
};

export { Parameter };
