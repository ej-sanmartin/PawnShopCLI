// @ts-check

const prompt = require("prompt-sync")();

const {Choice, handleChoice, printChoices} = require('./choice');
const {createPerson} = require('./person');

/**
 * @param {number} day datetime stores days of the week as number
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

    // Failure case if something goe wrong. This is a neutral message to output.
    return "day";
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

    let currentChoice = Choice.Deciding;

    while (currentChoice === Choice.Deciding) {
        printChoices();
        currentChoice = handleChoice();
    }

    outputGoodbyeMessage();
}

main()
