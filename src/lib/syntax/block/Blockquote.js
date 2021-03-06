/**
 * match a multi lines quote block
 *
 * (1) basic, syntax like this:
 *
 *  > This is a blockquote with two paragraphs.
 *  >
 *  > Paragraph two.
 *
 * (2) Technically not every line needs to start with a `>`
 * as long as there are no empty lines between paragraphs, like this:
 *
 *  > This is a blockquote
 *  second line
 *  third line.
 *
 *  > another paragraph.
 *
 * (3) blockquotes can be nested, like this:
 *
 *  > blockquote
 *  >
 *  > > can be nested.
 *  > > > Multiple Levels
 *  >
 *  > ## This is a header.
 *  >
 *  > 1.   This is the first list item.
 *  > 2.   This is the second list item.
 *  >
 *  > Here's some example code:
 *  >
 *  >     return 'Hellow World!';
 *
 */

'use strict';

import Valid from '../../utils/Valid';

/**
 * remove space which starts with the blockquote content string
 * @param data
 * @returns {ArrayBuffer|Array.<T>|Blob|string|*}
 */
function handleData(data) {
    return data.startsWith(' ') ? data.slice(1) : data;
}

function parse(line, index, lines, renderTree) {

    const reg = /^(?:\>)(?:\s*?)(.*?)(?:\n|$)/;
    let result = line.match(reg);

    if (!result) {
        return;
    }

    const block = { // blockquote root node
            type: 'Blockquote',
            children: []
        },
        content = [handleData(result[1])]; // all blockquote content

    let blankLineFlag = false,
        lineType;

    index++;
    for (let len = lines.length; index < len; index++) {

        // if this line is blank
        if (Valid.isBlank(lines[index])) {

            blankLineFlag = true;

            content.push(lines[index]);
            continue;

        }

        // calculate this line type
        lineType = this.parseBlock(lines[index], 0, lines.slice(index))[0].type;

        if (blankLineFlag && lineType !== 'Blockquote') {
            index--;
            break;
        }

        result = lines[index].match(reg);

        if (!result) {
            content.push(lines[index]);
            continue;
        }

        content.push(handleData(result[1]));
        blankLineFlag = false;

    }

    // parse recursively
    this.parseBlocks(content, block);

    return [block, index];

}

function render(data = '', node) {
    return `<blockquote>${node.rawValue || ''}${data}</blockquote>`;
}

export default {
    parse,
    render
};