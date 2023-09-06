// @ts-check

import psp from "prompt-sync-plus";

import {Choice, handleChoice, printChoices} from './choice.js';
import {goodbye} from './message.js';
import {createPerson} from './person.js';
import {createStore} from './store.js';

const prompt = psp(undefined);

/**
 * @property {Function} main entry point to this CLI program
 */
function main() {
    let player = createPerson();
    console.log(player.toString());
    let store = createStore();

    while (true) {
        printChoices();
        let promptResult = handleChoice(store, player);

        if (promptResult.choice === Choice.Exiting) {
            break;
        }
        console.log("");
    }

    goodbye();
}

main()
