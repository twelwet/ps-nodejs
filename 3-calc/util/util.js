const ACTIONS = {
	ADD: 'add',
	SUBTRACT: 'subtract',
	MULTIPLY: 'multiply',
	DIVIDE: 'divide',
};

const isNumber = (value) => {
	if (typeof value === 'number' && !Number.isNaN(value)) {
		return true;
	}
	return false;
};

const isDivisionByZero = (actionName, divider) => {
	if (actionName === ACTIONS.DIVIDE && divider === 0) {
		return true;
	} else {
		return false;
	}
};

const validate = (argv2, argv3, argv4) => {
	const payload = {
		valueOne: Number(argv2),
		valueTwo: Number(argv3),
		actionName: argv4.toUpperCase().toLowerCase(),
	};
	const errMessages = [];

	if (!isNumber(payload.valueOne)) {
		errMessages.push(`Аргумент '${argv2}' должен быть числом.`);
	}

	if (!isNumber(payload.valueTwo)) {
		errMessages.push(`Аргумент '${argv3}' должен быть числом.`);
	}

	if (!Object.values(ACTIONS).find((it) => it === payload.actionName)) {
		errMessages.push(`Аргумент '${argv4}' должен быть одним из списка [ ${Object.values(ACTIONS).join(', ')} ].`);
	}

	if (isDivisionByZero(payload.actionName, payload.valueTwo)) {
		errMessages.push(`Делитель не может быть равен нулю.`);
	}

	if (errMessages.length > 0) {
		return { isOkay: false, payload: {}, errMessages };
	}

	return { isOkay: true, payload, errMessages };
};

const calculate = (payload, actions) => {
	const { valueOne, valueTwo, actionName } = payload;
	const { symbol, fn } = actions.find((it) => it['name'] === actionName);
	return {
		valueOne,
		valueTwo,
		symbol,
		result: fn(valueOne, valueTwo),
	}
};

const print = ({ valueOne, valueTwo, symbol, result }) => {
	console.log(`${valueOne} ${symbol} ${valueTwo} = ${result}`);
};

const printErrors = (errMessages) => {
	console.log('Невалидные данные:');
	console.log(`${errMessages.join('\n')}`);
	console.log('-----');
	console.log('Пример валидного ввода:');
	console.log('>node index.js 2 2 add');
	console.log('2 + 2 = 4');
};

module.exports = { ACTIONS, validate, calculate, print, printErrors };
