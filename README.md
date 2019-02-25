# api-data-store
API Data store

A Data Store that will run the same API endpoint once, cache results, and expire after a timeout.

# Basic Usage

```
import axios from 'axios';
import ApiDataStore from 'api-data-store';

const users = await ApiDataStore.fetch('/api/v1/users', {
  fetchMethod: axios.get,
});
```

# Setting a global fetch method

```
import axios from 'axios';
import ApiDataStore from 'api-data-store';

ApiDataStore.setFetchMethod(axois.get);

const users = await ApiDataStore.fetch('/api/v1/users');
```

# Caching results in the default localStorage driver

```
import axios from 'axios';
import ApiDataStore from 'api-data-store';

ApiDataStore.setFetchMethod(axois.get);

const users = await ApiDataStore.fetch('/api/v1/users', {
  cache: true,
});
```

# Setting a timeout on the cache in milliseconds

```
import axios from 'axios';
import ApiDataStore from 'api-data-store';

ApiDataStore.setFetchMethod(axois.get);

const users = await ApiDataStore.fetch('/api/v1/users', {
  cache: true,
  timeout: 1000 * 60 * 5 // 5 minutes
});
```

# Using an in memory custom storage driver

The API Data Store uses the localStorage interface. If you need to create your own custom storage driver use the same methods as localStorage.

```
import axios from 'axios';
import ApiDataStore from 'api-data-store';
import MemoryDataStore from 'api-data-store/memoryDataStore';

ApiDataStore.setFetchMethod(axois.get);
ApiDataStore.setStorageDriver(new MemoryDataStore());

const users = await ApiDataStore.fetch('/api/v1/users', {
  cache: true,
  timeout: 1000 * 60 * 5 // 5 minutes
});
```