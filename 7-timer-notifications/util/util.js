const { notifier, getConfig } = require('./notifier.js');

const Hour = { MIN: 0, MAX: 23 };
const Minute = { MIN: 0, MAX: 59 };
const Second = { MIN: 0, MAX: 59 };

const INTERVAL_TIME = 1000;

const isNumber = (value) => {
	if (typeof value === 'number' && !Number.isNaN(value)) {
		return true;
	}
	return false;
};

const isValid = (argv, unitMin, unitMax) => {
	const value = Number(argv);
	if (!isNumber(value) || value < unitMin || value > unitMax) {
		return false;
	}
	return true;
};

const validate = (argv2, argv3, argv4) => {
	const errMessages = [];

	const data = [
		{ argv: argv2, minValue: Hour.MIN, maxValue: Hour.MAX, info: 'Количество часов' },
		{ argv: argv3, minValue: Minute.MIN, maxValue: Minute.MAX, info: 'Количество минут' },
		{ argv: argv4, minValue: Second.MIN, maxValue: Second.MAX, info: 'Количество секунд' },
	];

	for (const [index, item] of data.entries()) {
		const { argv, minValue, maxValue, info } = item;
		switch (argv) {
			case undefined:
				errMessages.push(`${index + 1}-й аргумент (${info}) не определен.`);
				break;
			default:
				if (!isValid(argv, minValue, maxValue)) {
					errMessages.push(`${info} '${argv}' должно быть числом в диапазоне от ${minValue} до ${maxValue}.`);
				}
		}
	}

	if (errMessages.length === 0) {
		return {
			hours: Number(argv2),
			minutes: Number(argv3),
			seconds: Number(argv4),
		};
	} else {
		throw new Error(`${errMessages.join('\n')}`);
	}
};

const getTimeInMiliseconds = ({ hours, minutes, seconds }) => {
	return 1000 * (hours * 3600 + minutes * 60 + seconds);
};

const getHumanLikeTime = (ms) => {
	const hour = Math.floor((ms / 1000) / 3600);
	const minute = Math.floor(((ms / 1000) - (hour * 3600)) / 60);
	const second = Math.round((ms / 1000) - (hour * 3600) - (minute * 60));
	return `${hour} ч ${minute} мин ${second} сек`;
};

const startTimer = ({ hours, minutes, seconds }) => {
	const ms = getTimeInMiliseconds({ hours, minutes, seconds });
	console.log(`⏰ [Таймер] Запущен: ${getHumanLikeTime(ms)}`);

	const intervalId = setInterval(() => {
		const remainingTime = Math.round((ms - performance.now()));
		console.log(`⏰ [Таймер] Осталось: ${getHumanLikeTime(remainingTime)}`)
	}, INTERVAL_TIME);

	setTimeout(() => {
		clearInterval(intervalId);
		notifier.notify(getConfig({ title: '⏰ [Таймер]', message: 'Время истекло.' }));
		console.log('⏰ [Таймер] Время истекло.');
	}, ms);
};

const printErrors = (err) => {
	console.log('Невалидные данные:');
	console.log(`${err.message}`);
	console.log('-----');
	console.log('Пример валидного ввода:');
	console.log('>node index.js 0 0 10');
};

module.exports = { validate, startTimer, printErrors };
