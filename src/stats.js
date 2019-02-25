const stats = {
  callCounts: {},
};

module.exports = {
  stats,
  incrementCallCount(url) {
    if (!stats.callCounts[url]) {
      stats.callCounts[url] = 0;
    }
    stats.callCounts[url] = stats.callCounts[url] + 1;
  },
  reset() {
    stats.callCounts = {};
  },
};
