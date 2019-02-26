const moment = require('moment');
const attempt = require('lodash/attempt');

const PREFIX = 'api-data-store:';

class LocalStorageDriver {
  constructor() {
    this.keys = Object.keys(localStorage);
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
    keys.push(key);
  }

  removeItem(key) {
    // delete this.store[key];
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
