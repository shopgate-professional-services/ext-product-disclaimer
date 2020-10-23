/**
 * Simple ttl based local storage
 */
class LocalStorageCache {
  /**
   * @param {string} name .
   * @param {number} ttlSec .
   * @param {number} limit .
   */
  constructor(name, ttlSec = 7776000, limit = 200) {
    this.key = name;
    this.ttlSec = ttlSec;
    this.limit = limit;
  }

  /**
   * @return {Array}
   */
  getStorage() {
    let state = localStorage.getItem(this.key);
    if (state) {
      try {
        state = JSON.parse(state);
      } catch (err) {
        state = [];
      }
    }
    return state || [];
  }

  /**
   * @param {string} id .
   * @return {boolean}
   */
  hasValidItem(id) {
    const state = this.getStorage();
    const found = state.find(i => i.id === id);
    if (!found) {
      return false;
    }

    return found.ex > Date.now();
  }

  /**
   * @param {string} id .
   */
  setItem(id) {
    let state = this.getStorage();

    // Remove existing
    state = state.filter(i => i.id !== id);

    // Prepend new
    state.unshift({
      id,
      ex: Date.now() + (this.ttlSec * 1000),
    });

    // Slice Fifo
    state = state.slice(0, this.limit);

    localStorage.setItem(this.key, JSON.stringify(state));
  }
}

export default LocalStorageCache;
