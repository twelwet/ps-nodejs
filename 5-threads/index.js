const os = require('os');
const {
	getInitialData,
	getResult,
	getResultByAllWorkers,
	compute,
	getArrayDescription,
} = require('./util/util.js');

const {INITIAL_ARRAY_SIZE, DIVIDER, DEFAULT_THREADS } = require('./constant.js');

const availableThreads = os.availableParallelism ? os.availableParallelism() : DEFAULT_THREADS;

const main = async (size, divider) => {
	const initialData = getInitialData(size);
	console.log(`Cчитаем кол-во элементов в массиве, кратное числу "${divider}".`);
	console.log(`Массив: ${getArrayDescription(initialData)}.`);

	await compute({
		data: initialData,
		divider,
		fn: getResult,
		threadsNumber: 1,
	});

	await compute({
		data: initialData,
		divider,
		fn: getResultByAllWorkers,
		threadsNumber: availableThreads,
	});
}

main(INITIAL_ARRAY_SIZE, DIVIDER);
