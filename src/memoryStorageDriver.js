const moment = require('moment');

let store = {};
let prefix = '';

const clear = () => {
  store = {};
};

const MemoryStorageDriver = {

  clear,

  setPrefix(_prefix) {
    prefix = _prefix;
  },

  getItem(key) {
    return store[prefix + key] || null;
  },

  setItem(key, value) {
    const item = { value, timestamp: moment().unix() };
    store[prefix + key] = item;
  },

  removeItem(key) {
    delete store[prefix + key];
  },

  reset() {
    clear();
  },

  hasItem(key) {
    let value = store[prefix + key] || null;
    return value !== undefined && value !== null;
  },

  getKeys() {
    return Object.keys(store);
  },
};

module.exports = MemoryStorageDriver;
