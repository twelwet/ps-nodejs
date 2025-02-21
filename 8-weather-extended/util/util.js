import { printSuccess, printError } from '../services/log.service.js';
import { isCityExist } from '../services/api.service.js';
import { saveKeyValue, getKeyValue } from '../services/storage.service.js';
import { LANGUAGE, DATA_FIELD } from '../const.js';

const saveToken = async (token) => {
	printSuccess(`Задан ${DATA_FIELD.TOKEN}: '${token}'`);
	await saveKeyValue(DATA_FIELD.TOKEN, token);
};

const saveLanguage = async (lang) => {
	const validatedLanguage = validateLanguage(lang);
	if (validatedLanguage) {
		await saveKeyValue(DATA_FIELD.LANGUAGE, validatedLanguage);
	}
};

const saveCities = async (token, language, cities) => {
	const validatedCities = await validateCities(token, language, cities);
	if (!validatedCities || validatedCities.length === 0) {
		return;
	}
	await saveKeyValue(DATA_FIELD.CITIES, validatedCities);
}

const validateLanguage = (lang) => {
	const result = lang.toUpperCase().toLowerCase();
	if (Object.values(LANGUAGE).find((it) => it === result)) {
		printSuccess(`Задан язык отображения: '${result}'`);
		return result;
	}
	else {
		printError(`Невалидный язык '${result}', задайте через параметр '-l [LANG]'. Допустимые значения: ${Object.values(LANGUAGE)}`);
		return false;
	}
};

const validateCities = async (token, language, cities) => {
	const validatedCities = [];
	if (!cities || cities.length === 0) {
		printError('Не передано ни одного названия города');
		return;
	}
	for (const city of cities) {
		if (await isCityExist(token, language, city)) {
			validatedCities.push(city);
		}
	}
	return validatedCities;
};

const readToken = async () => {
	const token = await getKeyValue(DATA_FIELD.TOKEN);
	if (!token || token.length === 0) {
		printError(`Не задан ключ API, задайте его через '-t [API_KEY]'`);
		return false;
	}
	return token;
};

const readLanguage = async () => {
	const language = await getKeyValue(DATA_FIELD.LANGUAGE);
	if (!language || language.length === 0) {
		printError(`Не задан язык отображения, задайте его через '-l [LANG]'`);
		return false;
	}
	return language;
};

const readCities = async () => {
	const cities = await getKeyValue(DATA_FIELD.CITIES);
	if (!cities || cities.length === 0) {
		printError(`Не задан ни один город, задайте его через '-s [CITY_1 CITY_2 ...]'`);
		return false;
	}
	return cities;
};

export { saveToken, saveLanguage, saveCities, readToken, readLanguage, readCities };
