
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

module.exports = {
    isNullOrEmpty:isNullOrEmpty,
    trim:trim,
    formatStr:formatStr
}
