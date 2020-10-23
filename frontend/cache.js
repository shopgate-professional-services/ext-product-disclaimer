import LocalStorageCache from './classes/LocalStorageCache';
import { memoization } from './config';

const cache = new LocalStorageCache(
  'ps.product.disclaimer',
  memoization.ttl,
  memoization.limit
);

/**
 * @type LocalStorageCache
 */
export default cache;
