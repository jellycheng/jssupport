const os = require('os');
const NODE_EOL = os.EOL;


function isWindows() {
    let osStr = os.platform(); //process.platform
    if("win32" == osStr) {
        return true
    }
    return false
}

function isMac() {
    let osStr = os.platform();
    if("darwin" == osStr) {
        return true
    }
    return false
}

module.exports = {
    isWindows:isWindows,
    isMac:isMac,
    NODE_EOL:NODE_EOL
}
