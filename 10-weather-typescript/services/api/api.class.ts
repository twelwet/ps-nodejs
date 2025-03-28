import { getWeather, validate } from './util.js';
import {
	TOKEN_KEY,
	CITY_KEY,
	VALID_CITY_NAME,
	CLI_KEY_TOKEN,
	CLI_KEY_CITY
} from '../../const.js';

class API {
	async validateToken(
		tokenValue: string | false,
		cityValue: string = VALID_CITY_NAME
	): Promise<boolean> {
		return await validate(tokenValue, CLI_KEY_TOKEN, TOKEN_KEY, tokenValue, cityValue);
	}

	async validateCity(
		tokenValue: string | false,
		cityValue: string | false
	): Promise<boolean> {
		return await validate(cityValue, CLI_KEY_CITY, CITY_KEY, tokenValue, cityValue);
	}

	async getForcast(
		tokenName: string | false,
		cityName: string | false
	): Promise<void> {
		await getWeather(tokenName, cityName);
	}
}

export { API };
