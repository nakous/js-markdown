/**
 * match reference defines
 *
 * It can be used in Link or Image.
 *
 * syntax like this:
 *
 *  [reference]: Hello World
 *
 */

'use strict';

function parse(line, index, lines, renderTree) {

    const result = line.match(/^\s*\[(.+)\]:\s*(.+?)(?:[ \t]+(["'])(.*?)\3)?(?:\n|$)/);

    if (!result) {
        return;
    }

    if (renderTree) {

        if (!renderTree.referenceDefine) {
            renderTree.referenceDefine = {};
        }

        renderTree.referenceDefine[result[1].toLowerCase()] = {
            href: result[2],
            title: result[4]
        };

    }

    return [null, index];

}

export default {
    parse
};