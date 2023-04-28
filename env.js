const fs = require('fs');

class Env {

  constructor(fileName) {
    this.envData = this.load(fileName);
  }

  load(fileName) {
    const obj = {};
    fileName.toString().split('\n').forEach(function (line, idx) {
      const keyValAry = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if(keyValAry != null) {
        const key = keyValAry[1];
        let val = keyValAry[2] || '';
        const len = val ? val.length : 0;
        if(len > 0 && val.charAt(0) === '"' && val.charAt(len - 1) === '"') {
          val = val.replace(/\\n/gm, '\n');
        }
        val = val.replace(/(^['"]|['"]$)/g, '').trim();
        if(val.match(/(^[[]|[]]$)/g) != null) {
          val = val.replace(/(^[\[]|[\]]$)/g, '').trim().split(',');
        }
        obj[key] = val;
      }
    })

    return obj;
  }

  parseArray(arr, val, obj) {
    let a = arr.shift();
    let ob = {};
    if (arr.length >= 1) {
      if (obj.hasOwnProperty(a)) {
        Object.assign(obj[a], this.parseArray(arr, val, obj[a]));
      } else {
        obj[a] = {};
        Object.assign(obj[a], this.parseArray(arr, val, obj[a]));
      }
    } else {
      Object.assign(ob, { [a]: val });
    }
    return ob;
  }

  formatEnv() {
    let obj = {};
    Object.keys(this.envData).forEach(key => {
      if (key.split('.').length === 1) {
        obj[key] = this.envData[key];
      } else {
        Object.assign(obj, this.parseArray(key.split('.'), this.envData[key], obj));
      }
    });
    return obj;
  }

  getEnvData() {
    return this.envData;
  }

  json() {
    return this.formatEnv();
  }

}

function envPlugin(fileName) {
  const fileContent = fs.readFileSync(fileName, 'utf-8');
  return new Env(fileContent);
}

module.exports = envPlugin;
