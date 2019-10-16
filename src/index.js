const moment = require('moment');
const LocalStorageDriver = require('./localStorageDriver');
const MemoryStorageDriver = require('./memoryStorageDriver');
const resolver = require('./resolver');
const stats = require('./stats');

let prefix = 'api-data-store:';
let fetchMethod;
let storageDriver =
  typeof localStorage !== 'undefined'
    ? LocalStorageDriver
    : MemoryStorageDriver;

storageDriver.setPrefix(prefix);

const isExpired = (timestamp, expires) => {
  const dateTime = moment.unix(timestamp);
  const now = moment();
  return now.diff(dateTime, 'milliseconds') >= expires;
};

const fetch = async (url, options = {}) => {
  const { cache = false, defaultValue = null, expires } = options;

  // If caching the results
  if (cache && storageDriver.hasItem(url)) {
    const item = storageDriver.getItem(url);

    // If the caching expires then check if it has
    if (expires) {
      if (item.timestamp && !isExpired(item.timestamp, expires)) {
        return item.value ? item.value : defaultValue;
      }
    } else {
      return item.value ? item.value : defaultValue;
    }
  }

  // Make the call with fetchMethod
  // You can change to any fetch method, such as axios.get
  const results = await resolver(url, { ...options, fetchMethod });

  // If using the cache then cache the results
  if (cache) {
    storageDriver.setItem(url, results);
  }

  // Keep track of how many calls the same url is being called
  stats.incrementCallCount(url);

  return results;
};

const setFetchMethod = _fetchMethod => (fetchMethod = _fetchMethod);
const setStorageDriver = _storageDriver => (storageDriver = _storageDriver);
const setPrefix = _prefix => (prefix = _prefix);

const reset = () => {
  storageDriver.reset();
  stats.reset();
};

const clear = reset;

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
  clear,
  hasItem,
  getKeys,
  removeItem,
  getItem,
  setPrefix,
};
