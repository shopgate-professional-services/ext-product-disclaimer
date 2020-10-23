import LocalStorageCache from './classes/LocalStorageCache';
import { cache as cacheConfig } from './config';

const cache = new LocalStorageCache(
  'product.disclaimer',
  cacheConfig.ttl,
  cacheConfig.limit
);

/**
 * @type LocalStorageCache
 */
export default cache;
