const cryptoObj = require('crypto');

function md5(str) {
  const md5 = cryptoObj.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
}

module.exports = {
	md5:md5
};
