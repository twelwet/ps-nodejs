const { argv } = require('node:process');
const { EventEmitter } = require('node:stream');
const add = require('./actions/add.js');
const subtract = require('./actions/subtract.js');
const multiply = require('./actions/multiply.js');
const divide = require('./actions/divide.js');

const DEFAULT_NUM = 0;
const DEFAULT_ACTION_NAME = 'add';

const myEmitter = new EventEmitter();

const actions = [ 
	{ name: DEFAULT_ACTION_NAME, fn: add },
	{ name: 'subtract', fn: subtract },
	{ name: 'multiply', fn: multiply },
	{ name: 'divide', fn: divide },
];

for (const action of actions) {
	myEmitter.on(action.name, action.fn);
}

const firstNum = Number(argv[2]) || DEFAULT_NUM;
const secondNum = Number(argv[3]) || DEFAULT_NUM;
const actionName = actions.map((it) => it.name).find((it) => it === argv[4]) ? argv[4] : DEFAULT_ACTION_NAME;

myEmitter.emit(actionName, firstNum, secondNum);
