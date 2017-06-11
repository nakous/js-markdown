'use strict';

function isArray(obj) {
    return ({}).toString.call(obj) === '[object Array]';
}

function at(index) {

    if (!this) {
        throw TypeError();
    }

    const str = '' + this,
        len = str.length;

    if (index >= len) {
        return;
    }
    if (index < 0) {
        index = len - index;
    }

    let i = 0;
    for (let item of str) {
        if (i === index) {
            return item;
        }
    }

    return;

}

function trimHandle(str, chars = ' ', position) {

    let cs = chars;

    if (isArray(chars)) {
        cs = chars.join('');
    }

    const startReg = new RegExp(`^[${cs}]*`, 'g'),
        endReg = new RegExp(`[${cs}]*$`, 'g');

    if (position === 'start') {
        return str.replace(startReg, '');
    } else if (position === 'end') {
        return str.replace(endReg, '');
    }

    return str.replace(startReg, '').replace(endReg, '');

}

function trimStart(str, chars = ' ') {
    return trimHandle(str, chars, 'start');
}

function trimEnd(str, chars = ' ') {
    return trimHandle(str, chars, 'end');
}

function trim(str, chars = ' ') {
    return trimHandle(str, chars);
}

function formatCRLF(str) {
    return str.replace(/\r\n?/g, '\n');
};

function countLines(str) {
    return str.split('\n').length - 1;
};

function traverse(node, callback, deep = 0) {

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            traverse.call(this, node.children[i], callback, deep + 1);
        }
    }

    callback.call(this, node, deep);

}

function encodeHTML(str) {

    if (!str) {
        return str;
    }

    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

}

function trimEndBlankLines(array) {

    if (!array || array.length < 1) {
        return array;
    }

    while (trim(array[array.length - 1], ' \t') === '') {
        array.pop();
    }

    return array;

}

function matchUrl(str) {
    const reg = /^(?:\s*)(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/i;
    return str.match(reg);
}

function isBlankLine(line) {
    return line === '' || trim(line, ' \t') === '';
}

export default {
    isArray,
    at,
    trimHandle,
    trimStart,
    trimEnd,
    trim,
    formatCRLF,
    countLines,
    traverse,
    encodeHTML,
    trimEndBlankLines,
    matchUrl,
    isBlankLine
};