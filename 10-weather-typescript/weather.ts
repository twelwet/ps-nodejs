#!/usr/bin/env node
import yargs from 'yargs';
import { api, logger } from './services/services.js';
import { token, city } from './parameters/parameters.js';
import { CLI_KEY_HELP, CLI_KEY_TOKEN, CLI_KEY_CITY } from './const.js';

const initCLI = async () => {
	const argv = yargs(process.argv)
		.boolean(CLI_KEY_HELP)
		.string(CLI_KEY_TOKEN)
		.string(CLI_KEY_CITY)
		.parse();

	for (const [key, value] of Object.entries(argv)) {
		if (key === CLI_KEY_HELP) {
			return logger.printHelp();
		}
		if (key === CLI_KEY_TOKEN) {
			return token.save(value);
		}
		if (key === CLI_KEY_CITY) {
			return city.save(value);
		}
	}

	const tokenValue = await token.read();
	const isTokenValid = await api.validateToken(tokenValue);

	let cityValue: string | null = null;
	let isCityValid: Boolean = false;

	if (isTokenValid) {
		cityValue = await city.read();
		isCityValid = await api.validateCity(tokenValue, cityValue);
	}

	if (isTokenValid && isCityValid) {
		await api.getForcast(tokenValue, cityValue);
	}
};

initCLI();
