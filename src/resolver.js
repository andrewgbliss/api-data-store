const moment = require('moment');
const promises = {};

module.exports = async options => {
  const { url, params, fetchMethod } = options;
  if (promises[url]) {
    if (promises[url].resolved) {
      return promises[url].promise;
    } else {
      return resolver(options);
    }
  }
  promises[url] = {
    resolved: false,
  };
  const promise = fetchMethod(url, params);
  promises[url] = {
    resolved: true,
    promise,
    timestamp: moment().unix(),
  };
  return promise;
};
