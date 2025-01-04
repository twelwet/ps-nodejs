const notifier = require('node-notifier');

const getConfig = ({title, message}) => ({
	title,
	message,
	sound: true,
	timeout: 5,
});

module.exports = { notifier, getConfig };
