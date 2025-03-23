import { API } from "./api/api.class.js";
import { Storage } from "./storage/storage.class.js";

const api = new API();
const storage = new Storage();

export { api, storage };