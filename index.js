'use strict';

function walk(obj, path, initMissing) {
  if (path) {
    let ary = path.split('.');
    while (ary.length) {
      let k = ary.shift();
      if (initMissing && obj[k] == null) {
        obj[k] = {};
        obj = obj[k];
      } else if (k in obj) {
        obj = obj[k];
      } else {
        throw new Error("配置不存在：'" + path + "'");
      }
    }
  }

  return obj;
}

function hi(str) {
  console.log(str || "welcome to jssupport");
}

module.exports.walk = walk;
module.exports.hi = hi;
