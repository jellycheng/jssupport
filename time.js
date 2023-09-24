
function getTimeNow() {
  const cur = parseInt(Date.parse(new Date()) / 1000, 10);
  return cur;
}

// 获取当前时间毫秒数
function getTimeMilliseconds() {
  return Date.now();
}

// 睡眠，单位秒, await timeObj.sleep(1);
function sleep(s) {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve('sleep for ' + s + ' s');
      }, s*1000);
  });
}


module.exports = {
  getTimeNow:getTimeNow,
  getMilliseconds:getTimeMilliseconds,
  sleep:sleep
}
