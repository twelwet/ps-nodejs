const { argv } = require('node:process');
const { validate, startTimer, printErrors } = require('./util/util');

const { isOkay, payload, errMessages } = validate(argv[2],argv[3],argv[4]);

if (isOkay) {
	startTimer(payload);
} else {
	printErrors(errMessages);
}
