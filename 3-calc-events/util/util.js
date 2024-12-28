const ACTIONS = {
	ADD: 'add',
	SUBTRACT: 'subtract',
	MULTIPLY: 'multiply',
	DIVIDE: 'divide',
};

const printResult = (a, b, symbol, fn) => {
	console.log(`${a} ${symbol} ${b} = ${fn(a, b)}`);
};

module.exports = { ACTIONS, printResult }
