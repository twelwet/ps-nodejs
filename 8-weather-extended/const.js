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

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
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

export { LANGUAGE, DICTIONARY, DATA_FIELD, ICONS };