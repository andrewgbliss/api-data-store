const moment = require('moment');
const attempt = require('lodash/attempt');

const PREFIX = 'api-data-store:';
const keys = [];

const setItem = (key, value) => {
  const item = { value, timestamp: moment().unix() };
  localStorage.setItem(PREFIX + key, JSON.stringify(item));
  keys.push(url);
};

const getItem = key => {
  const item = localStorage.getItem(PREFIX + key);
  return attempt(JSON.parse, item);
};

const hasItem = key => {
  return getItem(key) !== undefined && getItem(key) !== null;
};

const reset = () => {
  keys.forEach(key => {
    localStorage.removeItem(PREFIX + key);
  });
};

const getKeys = () => {
  return keys;
};

module.exports = {
  setItem,
  getItem,
  hasItem,
  reset,
  getKeys,
};
