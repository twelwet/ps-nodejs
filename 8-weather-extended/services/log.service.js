import chalk from 'chalk';
import dedent from 'dedent-js';
import { DICTIONARY } from '../const.js';

const printError = (error) => {
	console.log(`${chalk.bgRed('ERROR')} ${error}`);
};

const printSuccess = (message) => {
	console.log(`${chalk.bgGreen('SUCCESS')} ${message}`);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan('HELP')}
			Без параметров - вывод погоды
			-h для вывода помощи
			-t [API_KEY] сохранение токена
			-l [LANG] сохранение языка
			-s [CITY_1 CITY_2 ...] для установки списка городов
		`
	);
};

const printWeather = (res, icon, lang) => {
	console.log(
		dedent`
			${chalk.bgGreen('SUCCESS')} ${DICTIONARY[lang].WEATHER_IN} ${res.name}
			${icon} ${res.weather[0].description}
			${DICTIONARY[lang].TEMPERATURE}: ${res.main.temp} (${DICTIONARY[lang].FEELS_LIKE} ${res.main.feels_like})
			${DICTIONARY[lang].HUMIDITY}: ${res.main.humidity}
			${DICTIONARY[lang].WIND_SPEED}: ${res.wind.speed}
			`
	);
};

export { printError, printSuccess, printHelp, printWeather };
