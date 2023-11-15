
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

// 星期
function getWeek(){
  const ary = new Array("日", "一", "二", "三", "四", "五", "六");
  const week = new Date().getDay();
  return ary[week];
}

// 获取今天开始和结束时间戳
function getCurDaySEtime(){
  const dObj = new Date();
  const y = dObj.getFullYear();
  const m = dObj.getMonth();
  const d = dObj.getDate();
  const sTime = new Date(y, m, d, 0, 0, 0).valueOf() / 1000;
  const eTime = new Date(y, m, d, 23, 59, 59).valueOf() / 1000;
  return [sTime, eTime];
}

// 获取指定月天数，month=0-11
function getMonthDays(year, month) {
  let days = [31,28,31,30,31,30,31,31,30,31,30,31] 
  if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
        days[1] = 29
  }
  return days[month]  
}

// 获取当月开始时间戳和结束时间戳
function getCurMonthSEtime(){
  const dObj = new Date();
  const y = dObj.getFullYear();
  const m = dObj.getMonth(); //0-11
  const d = getMonthDays(y, m);
  const sTime = new Date(y, m, 1, 0, 0, 0).valueOf() / 1000;
  const eTime = new Date(y, m, d, 23, 59, 59).valueOf() / 1000;
  return [sTime, eTime];
}

module.exports = {
  getTimeNow:getTimeNow,
  getMilliseconds:getTimeMilliseconds,
  sleep:sleep,
  getWeek:getWeek,
  getCurDaySEtime:getCurDaySEtime,
  getMonthDays:getMonthDays,
  getCurMonthSEtime:getCurMonthSEtime
}
