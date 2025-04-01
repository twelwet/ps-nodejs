import chalk from 'chalk';
import dedent from 'dedent-js';
import { IDataFromAPI } from '../../types.js';
import { CLI_KEY_HELP, CLI_KEY_TOKEN, CLI_KEY_CITY, TOKEN_KEY, CITY_KEY } from '../../const.js';

class Logger {
	printError(error: string): void {
		console.log(`${chalk.bgRed('ERROR')} ${error}`);
	}

	printSuccess(message: string): void {
		console.log(`${chalk.bgGreen('SUCCESS')} ${message}`);
	}

	printHelp(): void {
		console.log(
			dedent`${chalk.bgCyan('HELP')}
				Без параметров - вывод погоды
				-${CLI_KEY_HELP} для вывода помощи
				-${CLI_KEY_TOKEN} [${TOKEN_KEY}] сохранение API-токена внешнего сервиса
				-${CLI_KEY_CITY} [${CITY_KEY}] установка города
			`
		);
	}

	printWeather(res: IDataFromAPI, icon: string): void {
		console.log(
			dedent`
				${chalk.bgGreen('SUCCESS')} ☂️ Погода: ${res.name}
				${icon} ${res.weather[0].description}
				🌡️ Температура: ${res.main.temp}℃ (Ощущается как: ${res.main.feels_like}℃)
				💦 Влажность: ${res.main.humidity}
				🌀 Скорость ветра: ${res.wind.speed}
				`
		);
	}
}

export { Logger };
