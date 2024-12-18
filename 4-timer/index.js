const { argv } = require('node:process');
const {parseTime, getTimeInMiliseconds, getHumanLikeTime} = require('./util/util');

const INTERVAL_TIME = 1000;

const startTimer = (ms) => {
	console.log(`⏰ [Таймер] Запущен: ${getHumanLikeTime(ms)}`);

	const intervalId = setInterval(() => {
		const remainingTime = Math.round((ms - performance.now()));
		console.log(`⏰ [Таймер] Осталось: ${getHumanLikeTime(remainingTime)}`)
	}, INTERVAL_TIME);

	setTimeout(() => {
		clearInterval(intervalId);
		console.log('⏰ [Таймер] Время истекло.')
	}, ms);
}

const parsedTime = parseTime([
	argv[2],
	argv[3],
	argv[4]
]);

const timeInMiliseconds = getTimeInMiliseconds(parsedTime);

startTimer(timeInMiliseconds);
