const moment = require('moment');
const promises = {};

const resolver = async (url, options) => {
  const { params, fetchMethod } = options;
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

module.exports = resolver;
