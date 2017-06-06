function parse(line, index, lines, blocks) {

    const reg = /^(?:\>)\s*(.*?)\s*(?:\n|$)/;
    let result = line.match(reg);

    if (!result) {
        return;
    }

    const block = {
            display: 'block',
            type: 'Blockquote',
            children: []
        },
        content = [result[1]];

    let blankLineFlag = false,
        lineType;

    index++;
    for (let len = lines.length; index < len; index++) {

        if (lines[index] === '' || _.trim(lines[index]) === '') {

            blankLineFlag = true;

            content.push('');
            continue;

        } else {
            blankLineFlag = false;
        }

        lineType = this.parseBlock(lines[index], 0, lines.slice(index))[0].type;

        if ((lineType !== 'Blockquote' && lineType !== 'Paragraph') || (blankLineFlag && lineType === 'Paragraph')) {
            index--;
            break;
        }

        if (lineType === 'Paragraph') {
            content.push(lines[index]);
            continue;
        }

        result = lines[index].match(reg);

        if (!result) {
            index--;
            break;
        }

        content.push(result[1]);

    }

    block.children = this.parseBlocks(content);

    return [block, index];

}

function render(data = '', node) {
    return `<blockquote>${data || node.rawValue || ''}</blockquote>`;
}

export default {
    parse,
    render
};