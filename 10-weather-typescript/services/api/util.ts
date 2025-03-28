import axios from 'axios';
import { logger } from '../services.js';
import { API_URL, LANGUAGE, UNITS, ICONS } from './const.js';
import { IDataFromAPI, paramKey, paramCLIKey } from '../../types.js';

const getIcon = (iconFromAPI: string, icons = ICONS): string | undefined => {
	const iconCode = iconFromAPI.slice(0, -1);
	return icons.get(iconCode);
};

const getParams = (
	tokenValue: string | false,
	cityValue: string | false,
	lang = LANGUAGE,
	units = UNITS
): object => ({
	q: cityValue,
	appid: tokenValue,
	lang,
	units,
});

const getWeatherFromAPI = async (
	tokenName: string | false,
	cityValue: string | false
): Promise<IDataFromAPI | false> => {
	try {
		const params = getParams(tokenName, cityValue);
		const { data } = await axios.get(API_URL, { params });
		return data;
	} catch(err) {
		return false;
	}
};

const validate = async (
	paramValue: string | false,
	paramCLIKey: paramCLIKey,
	paramKey: paramKey,
	tokenValue: string | false,
	cityValue: string | false,
): Promise<boolean> => {
	if (!paramValue) {
		logger.printError(`Параметр ${paramKey} НЕ задан, задайте через ключ -${paramCLIKey}`);
		return false;
	}

	let data: IDataFromAPI | false = false;
	if (tokenValue && cityValue) {
		data = await getWeatherFromAPI(tokenValue, cityValue);
		if (data === false) {
			logger.printError(`Параметр ${paramKey} НЕ является валидным, задайте через ключ -${paramCLIKey}`);
			return false;
		}
		logger.printSuccess(`Параметр ${paramKey} является валидным`);
		return true;
	}
	return false;
};

const getWeather = async (
	tokenName: string | false,
	cityName: string | false
): Promise<void> => {
	const data: IDataFromAPI | false = await getWeatherFromAPI(tokenName, cityName);
	let icon: string | undefined = undefined;
	if (data) {
		icon = getIcon(data.weather[0].icon);
	}
	if (data && icon) {
		return logger.printWeather(data, icon);
	}
	return logger.printError('Что-то пошло не так');
}

export { getWeatherFromAPI, getWeather, validate };
