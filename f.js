const path = require("path");
const fs   = require("fs");
const CWD = process.cwd();

//根据当前工作目录拼接路径
function pinPath(dir) {
    return path.join(CWD, dir || '');
}

function fileGetContents(fileName) {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    return fileContent;
}

function filePutContents(fileName, contents) {
	fs.appendFile(fileName, contents + "\n", err =>{});
}

function fileExists(fileName) {
    return fs.existsSync(fileName)
}

function mkdirs(d) {
    return fs.mkdirSync(d, {recursive:true});
}

module.exports = {
	pinPath:pinPath,
    file_get_contents:fileGetContents,
    file_put_contents: filePutContents,
    file_exists:fileExists,
    mkdir:mkdirs
};

