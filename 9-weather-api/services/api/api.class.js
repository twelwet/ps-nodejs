import { getWeatherFromAPI, getIconEmoji, mapDataForMarkup } from './util.js';
import { VALID_CITY_NAME } from './const.js';

class API {
	async validateToken(tokenName, cityName = VALID_CITY_NAME) {
		const data = await getWeatherFromAPI(tokenName, cityName);
		return data ? true : false;
	}

	async validateCity(tokenName, cityName) {
		const data = await getWeatherFromAPI(tokenName, cityName);
		return data ? true : false;
	}

	async getForcast(tokenName, cityName) {
		const data = await getWeatherFromAPI(tokenName, cityName);
		const iconEmoji = getIconEmoji(data.weather[0].icon);
		return mapDataForMarkup(data, iconEmoji);
	}
}

export { API };
