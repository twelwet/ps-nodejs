const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const LANGUAGE = 'ru';

const UNITS = 'metric';

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

export { API_URL, LANGUAGE, UNITS, ICONS };
