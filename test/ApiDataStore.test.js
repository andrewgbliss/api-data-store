const expect = require('chai').expect;
const ApiDataStore = require('../src');
const MemoryStorageDriver = require('../src/memoryStorageDriver');

const axoisMock = {
  async get(url, params) {
    return [
      {
        id: 1,
        name: 'John',
      },
      {
        id: 2,
        name: 'Johnson',
      },
    ];
  },
};

ApiDataStore.setFetchMethod(axoisMock.get);

const url = '/api/v1/users';

describe('API Data Store', () => {
  beforeEach(() => {
    ApiDataStore.reset();
  });

  describe('#fetch()', () => {
    it('should return 2 users', async () => {
      const users = await ApiDataStore.fetch(url);
      expect(users).to.be.an('array');
      expect(users.length).to.equal(2);
      expect(ApiDataStore.stats.callCounts[url]).to.equal(1);
    });

    it('should make 2 calls', async () => {
      await ApiDataStore.fetch(url);
      await ApiDataStore.fetch(url);
      expect(ApiDataStore.stats.callCounts[url]).to.equal(2);
    });

    it('should not hasItem', async () => {
      await ApiDataStore.fetch(url);
      expect(ApiDataStore.hasItem(url)).to.equal(false);
    });

    it('should hasItem with cache', async () => {
      await ApiDataStore.fetch(url, {
        cache: true,
      });
      expect(ApiDataStore.hasItem(url)).to.equal(true);
    });

    it('should make 1 call and use cache', async () => {
      await ApiDataStore.fetch(url, {
        cache: true,
      });
      await ApiDataStore.fetch(url, {
        cache: true,
      });
      expect(ApiDataStore.stats.callCounts[url]).to.equal(1);
    });

    it('should make 1 call and use cache and expire in 2 seconds', async () => {
      await ApiDataStore.fetch(url, {
        cache: true,
        expires: 10,
      });
      await ApiDataStore.fetch(url, {
        cache: true,
        expires: 10,
      });
      expect(ApiDataStore.stats.callCounts[url]).to.equal(2);
    });
  });
});
