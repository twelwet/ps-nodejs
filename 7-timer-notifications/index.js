const { argv } = require('node:process');
const { validate, startTimer, printErrors } = require('./util/util');

try {
	startTimer(validate(argv[2], argv[3], argv[4]));
} catch (err) {
	printErrors(err);
}
