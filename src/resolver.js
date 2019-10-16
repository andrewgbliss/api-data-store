const moment = require('moment');
const promises = {};

// Store a list of promises that store an key / value pair
// of url => promise
const resolver = async (url, options) => {
  const { params, fetchMethod } = options;

  // If there is a promise for the url given
  if (promises[url]) {

    // If the promise is resolved then return the results
    if (promises[url].resolved) {
      return promises[url].promise;
    } else {

      // If the promise is not resolved wait on the resolver again
      return resolver(options);
    }
  }

  // If the promise has been resolved or if its
  // the first time being called
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
