type paramKey = 'token' | 'city';

type paramCLIKey = 't' | 's' | 'h';

interface IData {
	token: string;
	city: string;
}

interface IDataFromAPI {
	coord: {
		lon: number;
		lat: number;
	};
	weather: [{
		id: number;
		main: string;
		description: string;
		icon: string
	}],
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
};

interface IParamsForAPI {
	q: string | null,
	appid: string | null,
	lang: string,
	units: string,
}

export { paramKey, paramCLIKey, IData, IDataFromAPI, IParamsForAPI };
