'use strict';

import Str from './Str';

/**
 * a tree traverse method
 * @param node
 * @param callback
 * @param deep
 */
function traverse(node, callback, deep = 0) {

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            traverse.call(this, node.children[i], callback, deep + 1);
        }
    }

    callback.call(this, node, deep);

}

/**
 * remove blank(or only includes space and tab) item in array
 * @param array
 * @returns {*}
 */
function trimEndBlankLines(array) {

    if (!array || array.length < 1) {
        return array;
    }

    let temp;
    while (array.length > 0) {
        temp = array[array.length - 1];
        if (temp === '' || Str.trim(temp, ' \t') === '') {
            array.pop();
        } else {
            break;
        }
    }

    return array;

}

export default {
    traverse,
    trimEndBlankLines
};