const printResult = (a, b, symbol, fn) => {
	console.log(`${a} ${symbol} ${b} = ${fn(a, b)}`);
};

module.exports = { printResult }
