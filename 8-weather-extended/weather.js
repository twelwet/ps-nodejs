#!/usr/bin/env node
import { printHelp } from './services/log.service.js';
import { getForcast } from './services/api.service.js';
import { saveToken, saveLanguage, saveCities, readToken, readLanguage, readCities } from './util/util.js';
import { CLI_KEYS } from './const.js';
import yargs from 'yargs';

const commandMap = new Map([
	[CLI_KEYS.HELP, printHelp],
	[CLI_KEYS.TOKEN, saveToken],
	[CLI_KEYS.LANGUAGE, saveLanguage],
]);

const initCLI = async () => {
	const argv = yargs(process.argv)
		.boolean(CLI_KEYS.HELP)
		.string(CLI_KEYS.TOKEN)
		.string(CLI_KEYS.LANGUAGE)
		.array(CLI_KEYS.CITIES)
		.parse();

	for (const [key, value] of Object.entries(argv)) {
		const command = commandMap.get(key);
		if (command) {
			return await command(value);
		}
	}

	const token = await readToken();
	const language = await readLanguage();
	if (token && language && argv[CLI_KEYS.CITIES]) {
		return await saveCities(token, language, argv[CLI_KEYS.CITIES]);
	};

	const cities = await readCities();
	if (token && language && cities) {
		await getForcast(token, language, cities);
	};
};

initCLI();
