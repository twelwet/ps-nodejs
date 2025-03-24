import { Parameter } from './parameter.class.js';
import { DATA_KEY } from './const.js';

const token = new Parameter(DATA_KEY.TOKEN);
const city = new Parameter(DATA_KEY.CITY);

export { token, city };
