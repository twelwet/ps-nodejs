import axios from 'axios';
import { API_URL, LANGUAGE, UNITS, ICONS, MarkupPhrases } from './const.js';

const getParams = (token, city, lang = LANGUAGE, units = UNITS) => ({
	q: city,
	appid: token,
	lang,
	units,
});

const getWeatherFromAPI = async (token, city) => {
	try {
		const params = getParams(token, city);
		const { data } = await axios.get(API_URL, { params });
		return data;
	} catch(err) {
		return false;
	}
};

const getIconEmoji = (iconFromAPI, icons = ICONS) => {
	const iconCode = iconFromAPI.slice(0, -1);
	return icons.get(iconCode);
};

const mapDataForMarkup = (data, iconEmoji) => ({
	weatherIn: {
		key: MarkupPhrases.WEATHER,
		value: data.name,
	},
	description: {
		key: iconEmoji,
		value: data.weather[0].description,
	},
	temperature: {
		key: MarkupPhrases.TEMPERATURE,
		value: data.main.temp,
	},
	feelsLike: {
		key: MarkupPhrases.FEELS_LIKE,
		value: data.main.feels_like,
	},
	humidity: {
		key: MarkupPhrases.HUMIDITY,
		value: data.main.humidity,
	},
	windSpeed: {
		key: MarkupPhrases.WIND_SPEED,
		value: data.wind.speed,
	},
});

export { getWeatherFromAPI, getIconEmoji, mapDataForMarkup };
