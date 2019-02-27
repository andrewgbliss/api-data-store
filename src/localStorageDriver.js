const moment = require('moment');
const attempt = require('lodash/attempt');
const pull = require('lodash/pull');
const filter = require('lodash/filter');

const PREFIX = 'api-data-store:';

class LocalStorageDriver {
  constructor() {
    this.keys = filter(Object.keys(localStorage), key => {
      return key.indexOf(PREFIX) === 0;
    });
  }

  clear() {
    this.keys.forEach(key => {
      localStorage.removeItem(PREFIX + key);
    });
  }

  getItem(key) {
    const item = localStorage.getItem(PREFIX + key);
    return attempt(JSON.parse, item);
  }

  setItem(key, value) {
    const item = { value, timestamp: moment().unix() };
    localStorage.setItem(PREFIX + key, JSON.stringify(item));
    this.keys.push(key);
  }

  removeItem(key) {
    localStorage.removeItem(PREFIX + key);
    this.keys = pull(this.keys, key);
  }

  reset() {
    this.clear();
  }

  hasItem(key) {
    return this.getItem(key) !== undefined && this.getItem(key) !== null;
  }

  getKeys() {
    return this.keys;
  }
}

module.exports = LocalStorageDriver;
