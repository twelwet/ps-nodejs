const { argv } = require('node:process');
const { EventEmitter } = require('node:stream');
const add = require('./actions/add.js');
const subtract = require('./actions/subtract.js');
const multiply = require('./actions/multiply.js');
const divide = require('./actions/divide.js');
const { ACTIONS, validate, print } = require('./util/util.js');

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
myEmitter.on(false, print);

const { isOkay, payload, errMessages } = validate(argv[2], argv[3], argv[4]);

myEmitter.emit(payload.actionName, { isOkay, payload, errMessages }, actions);
myEmitter.emit(isOkay, { isOkay, payload, errMessages }, actions);