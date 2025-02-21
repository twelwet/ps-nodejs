const LANGUAGE = {
	RU: 'ru',
	EN: 'en',
};

const DICTIONARY = {
	[LANGUAGE.RU]: {
		TEMPERATURE: 'Температура',
		WEATHER_IN: 'Погода в городе',
		FEELS_LIKE: 'Ощущается как',
		HUMIDITY: 'Влажность',
		WIND_SPEED: 'Скорость ветра',
	},
	[LANGUAGE.EN]: {
		TEMPERATURE: 'Temperature',
		WEATHER_IN: 'Weather in',
		FEELS_LIKE: 'Feels like',
		HUMIDITY: 'Humidity',
		WIND_SPEED: 'Wind speed',
	},
};

const DATA_FIELD = {
	TOKEN: 'token',
	LANGUAGE: 'lang',
	CITIES: 'cities',
};

const ICONS = new Map([
	['01', '☀️'],
	['02', '🌤️'],
	['03', '☁️'],
	['04', '☁️'],
	['09', '🌧️'],
	['10', '🌦️'],
	['11', '🌩️'],
	['13', '❄️'],
	['50', '🌫️'],
]);

const CLI_KEYS = {
	HELP: 'h',
	TOKEN: 't',
	LANGUAGE: 'l',
	CITIES: 's',
};

export { LANGUAGE, DICTIONARY, DATA_FIELD, ICONS, CLI_KEYS };