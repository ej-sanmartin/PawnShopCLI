// @ts-check

import {toDayOfTheWeek} from './util.js';

/**
 * @property {Function} goodbye self explanatory. Logs bye message.
 */
function goodbye() {
    let date = new Date();
    let dayOfTheWeek = toDayOfTheWeek(date.getDay());
    console.log(`Thank you, have a Happy ${dayOfTheWeek}`);
}

export {goodbye};
