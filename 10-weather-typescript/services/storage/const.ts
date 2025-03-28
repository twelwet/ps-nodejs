import path from 'node:path';

const FILENAME = 'weather-data.json';
const FILEPATH = path.join(path.resolve('__dirname', '..'), FILENAME);

export { FILEPATH };
