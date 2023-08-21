// @ts-check

const prompt = require("prompt-sync")();

const {Choice, handleChoice, printChoices} = require('./choice');
const {goodbye} = require('./message');
const {createPerson} = require('./person');

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

    goodbye();
}

main()
