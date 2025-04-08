import { storage } from '../services/services.js';
import { paramKey, IData } from '../types.js';

class Parameter {
	key: paramKey;

	constructor(key: paramKey) {
		this.key = key;
	}

	async save(value: string): Promise<boolean> {
		return await storage.saveKeyValue(this.key, value);
	}

	async read(): Promise<string | null> {
		const value: string | null = await storage.getKeyValue(this.key);
		if (typeof value === 'string' && value.length === 0) {
			return null;
		}
		return value;
	}
};

export { Parameter };
