import psp from "prompt-sync-plus";

import {sanitizeStringInput} from './prompt_utils.js';
import {Person} from './person.js';
import {handleSaving} from "./saving.js";
import {handleBuy} from "./store.js";

const prompt = psp(undefined);

/** 
 * @typedef {Object} PromptResult
 * @property {Person} customer data about client using this application
 * @property {Choice} choice what client expects from running this CLI tool
 */

/**
 * Enum for what user is doing in the CLI shop
 * @readonly
 * @enum {string}
 */
const Choice = Object.freeze({
    Unknown: Symbol("UNKNOWN"),
    /** Default. User is deciding what to do */
    Deciding: Symbol("DECIDING"),
    /** Buying action, user taken to shop flow */
    Buying: Symbol("BUYING"),
    /** Saving action, save user information to external database */
    Saving: Symbol("SAVING"),
    /** Exiting action, program will be closed */
    Exiting: Symbol("EXITING")
})

/**
 * @property {Function} printChoices prints enum Choice to console
 * @returns void
 */
function printChoices() {
    let count = 1;
    for (const choice of Object.keys(Choice)) {
        if (choice === "Unknown" || choice === "Deciding") continue;
        console.log(`${count++}. ${choice}`);
    }
    console.log("");
}

/**
 * @param {string} choice player choice from CLI
 * @returns {Choice} sanitized and leaned up prompt input
 */
function choiceParser(choice) {
    let choiceString = sanitizeStringInput(choice).toUpperCase();

    // Fall through cases so similar results (ex. "1", "1."" and "BUYING")
    // map to the same Choice enum.
    switch (choiceString) {
        case "1":
        case "1.":
        case "BUY":
        case "BUYING":
            return Choice.Buying;
        case "2":
        case "2.":
        case "SAVE":
        case "SAVING":
            return Choice.Saving;
        case "3":
        case "3.":
        case "EXIT":
        case "EXITING":
            return Choice.Exiting;
        case "DECIDING":
            return Choice.Deciding;
        default:
            return Choice.Unknown;
    }
}

/**
 * Takes user input and performs action based on that
 * @property {Store} store one of a kind, beautiful storefront
 * @property {Person} customer interacting with this application
 * @returns {PromptResult} propagates customer choice and passed by value item
 */
function handleChoice(store, customer) {
    let currentChoice = choiceParser(prompt("What will it be today?\n"));

    switch (currentChoice) {
        case Choice.Buying:
            customer = handleBuy(store, customer)
            break;
        case Choice.Saving:
            handleSaving();
            break;
        case Choice.Exiting:
            return {choice: Choice.Exiting, customer: customer};
        default:
            console.log("Unknown");
    }

    return {choice: Choice.Deciding, customer: customer};
}

export {Choice, choiceParser, handleChoice, printChoices};
