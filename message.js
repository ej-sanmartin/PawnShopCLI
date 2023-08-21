// @ts-check

const {toDayOfTheWeek} = require('./util');

/**
 * @property {Function} goodbye self explanatory. Logs bye message.
 */
function goodbye() {
    let date = new Date();
    let dayOfTheWeek = toDayOfTheWeek(date.getDay());
    console.log(`Thank you, have a Happy ${dayOfTheWeek}`);
}

exports.goodbye = goodbye;
