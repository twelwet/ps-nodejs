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

const isValid = (value, unitMin, unitMax) => {
	if (!isNumber(value) || value < unitMin || value > unitMax) {
		return false;
	}
	return true;
};

const validate = (argv2, argv3, argv4) => {
	const payload = {
		hours: Number(argv2),
		minutes: Number(argv3),
		seconds: Number(argv4),
	};
	const errMessages = [];

	if (!isValid(payload.hours, Hour.MIN, Hour.MAX)) {
		errMessages.push(`Количество часов '${argv2}' должно быть числом в диапазоне от ${Hour.MIN} до ${Hour.MAX}.`);
	}

	if (!isValid(payload.minutes, Minute.MIN, Minute.MAX)) {
		errMessages.push(`Количество минут '${argv3}' должно быть числом в диапазоне от ${Minute.MIN} до ${Minute.MAX}.`);
	}

	if (!isValid(payload.seconds, Second.MIN, Second.MAX)) {
		errMessages.push(`Количество секунд '${argv4}' должно быть числом в диапазоне от ${Second.MIN} до ${Second.MAX}.`);
	}

	if (errMessages.length > 0) {
		return { isOkay: false, payload: {}, errMessages };
	}

	return { isOkay: true, payload, errMessages };
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
		console.log('⏰ [Таймер] Время истекло.')
	}, ms);
};

const printErrors = (errMessages) => {
	console.log('Невалидные данные:');
	console.log(`${errMessages.join('\n')}`);
	console.log('-----');
	console.log('Пример валидного ввода:');
	console.log('>node index.js 0 0 10');
};

module.exports = { validate, startTimer, printErrors };
