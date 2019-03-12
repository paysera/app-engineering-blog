const emojiMap = require('emoji-name-map');
const _ = require('lodash');

function transformEmoji(content) {
    let possibleEmojis = Object.keys(emojiMap.emoji);
    possibleEmojis = possibleEmojis.map(_.escapeRegExp);
    return content.replace(new RegExp(`:(${possibleEmojis.join('|')}):`, 'g'), emoji => {
        return emojiMap.get(emoji);
    });
}

module.exports = transformEmoji;
