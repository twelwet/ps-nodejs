const { argv } = require('node:process');
const add = require('./actions/add.js');
const subtract = require('./actions/subtract.js');
const multiply = require('./actions/multiply.js');
const divide = require('./actions/divide.js');
const { ACTIONS, validate, calculate, print, printErrors } = require('./util/util.js');

const actions = [
	{ name: ACTIONS.ADD, fn: add, symbol: '+' },
	{ name: ACTIONS.SUBTRACT, fn: subtract, symbol: '-' },
	{ name: ACTIONS.MULTIPLY, fn: multiply, symbol: '*' },
	{ name: ACTIONS.DIVIDE, fn: divide, symbol: '/' },
];

const { isOkay, payload, errMessages } = validate(argv[2], argv[3], argv[4]);

if (isOkay) {
	print(calculate(payload, actions));
} else {
	printErrors(errMessages);
}
