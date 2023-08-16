// @ts-nocheck

const {createPerson} = require('./person');

/**
 * Enum for what user is doing in the CLI shop
 * @readonly
 * @enum {string}
 */
const Choice = Object.freeze({
    /** Default. User is deciding what to do */
    Deciding: Symbol("deciding"),
    /** Buying action, user taken to shop flow */
    Buying: Symbol("buying"),
    /** Saving action, save user information to external database */
    Saving: Symbol("saving"),
    /** Exiting action, program will be closed */
    Exiting: Symbol("exiting")
})

/**
 * 
 * @param {number} day datetime stores days of the week as number, described below
 * @returns {string} convert the number to a string day of the week
 */
function toDayOfTheWeek(day) {
    switch(day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday"
    }
}

/**
 * @property {Function} outputGoodbyeMessage self explanatory. Logs bye message.
 */
function outputGoodbyeMessage() {
    let date = new Date();
    let dayOfTheWeek = toDayOfTheWeek(date.getDay());
    console.log(`Thank you, have a Happy ${dayOfTheWeek}`);
}

/**
 * @property {Function} main entry point to this CLI program
 */
function main() {
    let player = createPerson();
    console.log(player.toString());
    outputGoodbyeMessage();
}

main()
