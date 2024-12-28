const { argv } = require('node:process');
const add = require('./actions/add.js');
const subtract = require('./actions/subtract.js');
const multiply = require('./actions/multiply.js');
const divide = require('./actions/divide.js');
const { printResult } = require('./util/util.js');

const DEFAULT_NUM = 0;
const DEFAULT_ACTION_NAME = 'add';

const actions = [
	{ name: 'add', fn: add, symbol: '+' },
	{ name: 'subtract', fn: subtract, symbol: '-' },
	{ name: 'multiply', fn: multiply, symbol: '*' },
	{ name: 'divide', fn: divide, symbol: '/' },
];

const firstNum = Number(argv[2]) || DEFAULT_NUM;
const secondNum = Number(argv[3]) || DEFAULT_NUM;
const actionName = actions.map((it) => it.name).find((it) => it === argv[4]) ? argv[4] : DEFAULT_ACTION_NAME;

const { symbol, fn } = actions.find((it) => it.name === actionName);

printResult(firstNum, secondNum, symbol, fn);
