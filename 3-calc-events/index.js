const { argv } = require('node:process');
const { EventEmitter } = require('node:stream');
const add = require('./actions/add.js');
const subtract = require('./actions/subtract.js');
const multiply = require('./actions/multiply.js');
const divide = require('./actions/divide.js');
const { ACTIONS, validate, calculate, print, printErrors } = require('./util/util.js');

const myEmitter = new EventEmitter();

const actions = [
	{ name: ACTIONS.ADD, fn: add, symbol: '+' },
	{ name: ACTIONS.SUBTRACT, fn: subtract, symbol: '-' },
	{ name: ACTIONS.MULTIPLY, fn: multiply, symbol: '*' },
	{ name: ACTIONS.DIVIDE, fn: divide, symbol: '/' },
];

for (const action of actions) {
	myEmitter.on(action.name, print);
}
myEmitter.on(false, printErrors);

const { isOkay, payload, errMessages } = validate(argv[2], argv[3], argv[4]);

if (isOkay) {
	myEmitter.emit(payload.actionName, calculate(payload, actions));
} else {
	myEmitter.emit(false, errMessages);
}
