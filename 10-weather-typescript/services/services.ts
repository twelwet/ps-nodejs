import { API } from './api/api.class.js';
import { Storage } from './storage/storage.class.js';
import { Logger } from './logger/log.class.js';

const api = new API();
const storage = new Storage();
const logger = new Logger();

export { api, storage, logger };
