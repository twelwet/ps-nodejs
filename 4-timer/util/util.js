const MAX_HOUR = 24;
const MAX_MINUTE = 60;
const MAX_SECOND = 60;

const DEFAULT_HOUR = 0;
const DEFAULT_MINUTE = 0;
const DEFAULT_SECOND = 0;


const parseTime = ([h, m, s]) => {
	const hour = Number(h) || DEFAULT_HOUR;
	const minute = Number(m) || DEFAULT_MINUTE;
	const second = Number(s) || DEFAULT_SECOND;

	return [
		hour >= MAX_HOUR ? DEFAULT_HOUR : hour,
		minute >= MAX_MINUTE ? DEFAULT_MINUTE : minute,
		second >= MAX_SECOND ? DEFAULT_SECOND : second,
	];
}

const getTimeInMiliseconds = ([h, m, s]) => {
	return 1000 * (h * 3600 + m * 60 + s);
};

const getHumanLikeTime = (ms) => {
	const hour = Math.floor((ms / 1000) / 3600);
	const minute = Math.floor(((ms / 1000) - (hour * 3600)) / 60);
	const second = Math.round((ms / 1000) - (hour * 3600) - (minute * 60));
	return `${hour} ч ${minute} мин ${second} сек`;
}

module.exports = {parseTime, getTimeInMiliseconds, getHumanLikeTime};
