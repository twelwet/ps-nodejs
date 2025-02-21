import axios from 'axios';
import { getKeyValue } from './storage.service.js';
import { printSuccess, printError, printWeather } from './log.service.js';
import { ICONS } from '../const.js';

const getIcon = (iconFromAPI, icons) => {
	const iconCode = iconFromAPI.slice(0, -1);
	return icons.get(iconCode);
};

const getWeather = async (token, language, city) => {
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: language,
			units: 'metric'
		}
	});
	return data;
};

const isCityExist = async (token, language, city) => {
	try {
		await getWeather(token, language, city);
		printSuccess(`Город '${city}' является валидным`);
		return true;
	} catch (err) {
		if (err?.response?.status == 404) {
			printError(`Город ${city} НЕ является валидным`);
		} else {
			printError(err.message);
		}
		return false;
	}
};

const getForcast = async (token, language, cities) => {
	for (const city of cities) {
		const data = await getWeather(token, language, city);
		let icon = getIcon(data.weather[0].icon, ICONS);
		printWeather(data, icon, language);
	}
};

export { getWeather, getForcast, isCityExist };