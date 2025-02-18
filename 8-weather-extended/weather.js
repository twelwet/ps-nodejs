#!/usr/bin/env node
import { printHelp } from './services/log.service.js';
import { getForcast } from './services/api.service.js';
import { saveToken, saveLanguage, saveCities, readToken, readLanguage, readCities } from './util/util.js';
import yargs from 'yargs';

const initCLI = async () => {
	const argv = yargs(process.argv).array('s').parse();
	if (argv.h) {
		printHelp();
		return;
	}
	if (argv.t) {
		await saveToken(argv.t);
		return;
	}
	if (argv.l) {
		await saveLanguage(argv.l);
		return;
	}

	const token = await readToken();
	const language = await readLanguage();
	if (token && language && argv.s) {
		await saveCities(token, language, argv.s);
		return;
	}

	const cities = await readCities();
	if (token && language && cities) {
		getForcast(token, language, cities);
		return;
	}
};

initCLI();
