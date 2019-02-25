const moment = require('moment');

class MemoryStorageDriver {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    const item = { value, timestamp: moment().unix() };
    this.store[key] = item;
  }

  removeItem(key) {
    delete this.store[key];
  }

  reset() {
    this.clear();
  }

  hasItem(key) {
    return this.getItem(key) !== undefined && this.getItem(key) !== null;
  }

  getKeys() {
    return Object.keys(this.store);
  }
}

module.exports = MemoryStorageDriver;
