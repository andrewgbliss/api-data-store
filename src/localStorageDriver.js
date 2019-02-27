const moment = require('moment');
const attempt = require('lodash/attempt');
const filter = require('lodash/filter');

const PREFIX = 'api-data-store:';

class LocalStorageDriver {

  clear() {
    const keys = filter(Object.keys(localStorage), key => {
      return key.indexOf(PREFIX) === 0;
    });
    keys.forEach(key => {
      localStorage.removeItem(key);
    });
  }

  getItem(key) {
    const item = localStorage.getItem(PREFIX + key);
    return attempt(JSON.parse, item);
  }

  setItem(key, value) {
    const item = { value, timestamp: moment().unix() };
    localStorage.setItem(PREFIX + key, JSON.stringify(item));
  }

  removeItem(key) {
    localStorage.removeItem(PREFIX + key);
  }

  reset() {
    this.clear();
  }

  hasItem(key) {
    return this.getItem(key) !== undefined && this.getItem(key) !== null;
  }

  getKeys() {
    return filter(Object.keys(localStorage), key => {
      return key.indexOf(PREFIX) === 0;
    });
  }
}

module.exports = LocalStorageDriver;
