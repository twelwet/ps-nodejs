const { Worker } = require('worker_threads');

const getInitialData = (arraySize) => {
	const initialData = [];

	for (let i = 1; i <= arraySize; i++) {
		initialData.push(i);
	}
	return initialData;
};

const splitData = (array, pieces) => {
	const result = [];
	const chunk = Math.ceil(array.length / pieces);
	for (let i = 0; i < array.length; i += chunk) {
		result.push(array.slice(i, i + chunk));
	}
	return result;
};

const getResult = ({ data, divider }) => {
	const resultData = [];
	for (const item of data) {
		if (item % divider === 0) {
			resultData.push(item);
		}
	}
	return resultData.length;
};

const getResultByWorker = ({ data, divider }) => {
	return new Promise((resolve, reject) => {
		const worker = new Worker('./worker.js', {
			workerData: { data, divider }
		});

		worker.on('message', (msg) => {
			resolve(msg);
		});

		worker.on('error', (err) => {
			reject(err);
		});
	});
};

const getResultByAllWorkers = async ({ data, divider, threadsNumber }) => {
	const chunkedData = splitData(data, threadsNumber);
	const result = (await Promise.all(chunkedData
		.map((chunk) => getResultByWorker({ data: chunk, divider }))))
		.reduce((acc, current) => acc + current);
	return result;
};

const compute = async ({ data, divider, fn, threadsNumber }) => {
	console.log('-------');
	console.log(`⌛ Задействовано потоков: ${threadsNumber}`);
	performance.mark('start');
	const name = `Threads:${threadsNumber}`;

	const resultData = await fn({ data, divider, threadsNumber });

	performance.mark('end');
	performance.measure(name, 'start', 'end');
	console.log(`✅ Найдено чисел, кратных числу "${divider}": ${resultData}`);
	console.log(`🚀 Затраченное время: ${performance.getEntriesByName(name)
		.pop().duration
		.toFixed(2)}ms`);
};

const getArrayDescription = (arr) => {
	return `[${arr[0]}, ${arr[1]}, ${arr[2]}, ... ${arr[arr.length - 1]}]`;
};

module.exports = {
	getInitialData,
	getResult,
	getResultByAllWorkers,
	compute,
	getArrayDescription,
}