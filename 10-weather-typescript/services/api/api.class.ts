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
		tokenValue: string | null,
		cityValue: string = VALID_CITY_NAME
	): Promise<boolean> {
		return await validate(tokenValue, CLI_KEY_TOKEN, TOKEN_KEY, tokenValue, cityValue);
	}

	async validateCity(
		tokenValue: string | null,
		cityValue: string | null
	): Promise<boolean> {
		return await validate(cityValue, CLI_KEY_CITY, CITY_KEY, tokenValue, cityValue);
	}

	async getForcast(
		tokenName: string | null,
		cityName: string | null
	): Promise<void> {
		await getWeather(tokenName, cityName);
	}
}

export { API };
