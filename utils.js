
function isNullOrEmpty(s) {
    if(s == null || s == "") {
        return true;
    }
    return false;
}

function trim(str) {
    if(isNullOrEmpty(str)) {
        return str;
    }
    return str.replace(/^\s+|\s+$/g, "");
}

function formatStr(s, k, v) {
    return s.replace(new RegExp("\\{\\{" + k + "\\}\\}", "g"), v);
}

function phoneStar(phone) {
    return phone.replace(/1(\d{2})\d{4}(\d{4})/, '1$1****$2');
}

function awaitExit(s) {
    setTimeout(() => {
        process.exit(1);
    }, s*1000);
}

module.exports = {
    isNullOrEmpty:isNullOrEmpty,
    trim:trim,
    formatStr:formatStr,
    phoneStar:phoneStar,
    awaitExit:awaitExit
}
