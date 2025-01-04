const { parentPort, workerData } = require('worker_threads');
const { getResult } = require('./util/util.js');

parentPort.postMessage(getResult(workerData));
