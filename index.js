// @ts-check

import psp from "prompt-sync-plus";

import {Choice, handleChoice, printChoices} from './choice.js';
import {goodbye} from './message.js';
import {createPerson} from './person.js';

const prompt = psp();

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
        console.log("");
    }

    goodbye();
}

main()
