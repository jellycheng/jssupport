const path = require("path");
const CWD = process.cwd();

//根据当前工作目录拼接路径
function pingPath(dir) {
    return path.join(CWD, dir || '');
}


module.exports = {
	pingPath:pingPath
};

