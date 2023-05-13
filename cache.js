module.exports = () => {
  const cache = new Map();
  const timer = {};

  return {
    get: key => cache.get(key),
    set: (key, value, { expire } = {}) => {
      cache.set(key, value);
      if (expire) {
        const t = setTimeout(() => {
          cache.clear(key);
          delete timer[key];
        }, expire);

        if (timer[key]) {
          clearTimeout(timer[key]);
        }
        timer[key] = t;
      }

      //return this;
    },
    clear: key => {
      if (undefined !== key) {
        cache.delete(key);
      } else {
        cache.clear();
      }

      //return this;
    },
  };
};
