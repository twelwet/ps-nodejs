const ACTIONS = {
	ADD: 'add',
	SUBTRACT: 'subtract',
	MULTIPLY: 'multiply',
	DIVIDE: 'divide',
};

const isNumber = (value) => {
	if (typeof Number(value) === 'number' && !Number.isNaN(Number(value))) {
		return true;
	}
	return false;
};

const isDivisionByZero = (actionName, divider) => {
	if (actionName.toUpperCase().toLowerCase() === ACTIONS.DIVIDE && Number(divider) === 0) {
		return true;
	} else {
		return false;
	}
};

const validate = (argv2, argv3, argv4) => {
	const errMessages = [];

	for (const [index, value] of [argv2, argv3].entries()) {
		switch (value) {
			case undefined:
				errMessages.push(`${index + 1}-й аргумент не определен.`);
				break;
			default:
				if (!isNumber(value)) {
					errMessages.push(`${index + 1}-й аргумент '${value}' должен быть числом.`);
				}
		}
	}

	switch (argv4) {
		case undefined:
			errMessages.push(`3-й аргумент не определен.`);
			break;
		default:
			if (!Object.values(ACTIONS).find((it) => it === argv4.toUpperCase().toLowerCase())) {
				errMessages.push(`3-й аргумент '${argv4}' должен быть одним из списка [ ${Object.values(ACTIONS).join(', ')} ].`);
			}

			if (isDivisionByZero(argv4, argv3)) {
				errMessages.push(`Делитель не может быть равен нулю.`);
			}
	}

	if (errMessages.length === 0) {
		return {
			valueOne: Number(argv2),
			valueTwo: Number(argv3),
			actionName: argv4.toUpperCase().toLowerCase(),
		};
	} else {
		throw new Error(`${errMessages.join('\n')}`);
	}
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

const printErrors = (err) => {
	console.log('Ошибка:');
	console.log(`${err.message}`);
	console.log('-----');
	console.log('Пример валидного ввода:');
	console.log('>node index.js 2 2 add');
	console.log('2 + 2 = 4');
};

module.exports = { ACTIONS, validate, calculate, print, printErrors };
