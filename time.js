
function getTimeNow() {
  const cur = parseInt(Date.parse(new Date()) / 1000, 10);
  return cur;
}

// 获取当前时间毫秒数
function getTimeMilliseconds() {
  return Date.now();
}

module.exports.getTimeNow = getTimeNow
module.exports.getMilliseconds = getTimeMilliseconds
