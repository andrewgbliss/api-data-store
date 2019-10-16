const moment = require('moment');
const attempt = require('lodash/attempt');
const filter = require('lodash/filter');

let prefix = '';

const clear = () => {
  const keys = filter(Object.keys(localStorage), key => {
    return key.indexOf(prefix) === 0;
  });
  keys.forEach(key => {
    localStorage.removeItem(key);
  });
};

const getItem = (key) => {
  const item = localStorage.getItem(prefix + key);
  return attempt(JSON.parse, item);
};

const LocalStorageDriver = {

  clear,

  getItem,

  setPrefix(_prefix) {
    prefix = _prefix;
  },

  setItem(key, value) {
    const item = { value, timestamp: moment().unix() };
    localStorage.setItem(prefix + key, JSON.stringify(item));
  },

  removeItem(key) {
    localStorage.removeItem(prefix + key);
  },

  reset() {
    clear();
  },

  hasItem(key) {
    return this.getItem(key) !== undefined && this.getItem(key) !== null;
  },

  getKeys() {
    return filter(Object.keys(localStorage), key => {
      return key.indexOf(prefix) === 0;
    });
  },
};

module.exports = LocalStorageDriver;
