const divide = (a, b) => {
	switch (b) {
		case 0:
			console.log(`${a} / ${b} = ထ`);
			break;
		default:
			console.log(`${a} / ${b} = ${a / b}`);
	}
};

module.exports = divide;
