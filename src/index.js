const moment = require('moment');
const get = require('lodash/get');
const LocalStorageDriver = require('./localStorageDriver');
const MemoryStorageDriver = require('./memoryStorageDriver');
const resolver = require('./resolver');
const stats = require('./stats');

let fetchMethod;
let storageDriver =
  typeof localStorage !== 'undefined'
    ? new LocalStorageDriver()
    : new MemoryStorageDriver();

const isExpired = (timestamp, expires) => {
  const dateTime = moment.unix(timestamp);
  const now = moment();
  return now.diff(dateTime, 'milliseconds') >= expires;
};

const fetch = async (url, options = {}) => {
  const { cache = false, expires } = options;
  if (cache && storageDriver.hasItem(url)) {
    const item = storageDriver.getItem(url);
    if (expires) {
      if (!isExpired(get(item, 'timestamp'), expires)) {
        return get(item, 'value');
      }
    } else {
      return get(item, 'value');
    }
  }
  const results = await resolver(url, { ...options, fetchMethod });
  if (cache) {
    storageDriver.setItem(url, results);
  }
  stats.incrementCallCount(url);
  return results;
};

const setFetchMethod = _fetchMethod => (fetchMethod = _fetchMethod);
const setStorageDriver = _storageDriver => (storageDriver = _storageDriver);

const reset = () => {
  storageDriver.reset();
  stats.reset();
};

const hasItem = key => storageDriver.hasItem(key);

const getKeys = () => storageDriver.getKeys();

const removeItem = key => storageDriver.removeItem(key);
const getItem = key => storageDriver.getItem(key);

module.exports = {
  stats: stats.stats,
  fetch,
  setFetchMethod,
  setStorageDriver,
  reset,
  hasItem,
  getKeys,
  removeItem,
  getItem,
};
