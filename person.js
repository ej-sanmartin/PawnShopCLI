// @ts-check

import psp from "prompt-sync-plus";

import {sanitizeNumberInput, sanitizeStringInput} from './prompt_utils.js';

const prompt = psp(undefined);

/** Class holding person data interacting with this shop CLI. */
class Person {
    name;
    age;
    money;

    /** Builder helper class to create Person class. */
    static Builder = class {
        /**
         * @type {string}
         */
        name;
        /**
         * @type {number}
         */
        age;
        /**
         * @type {number}
         */
        money;

        /**
         * @property {Function} setName sets name to builder Person object
         * @param {string} name person's name
         */
        setName(name) {
            this.name = name;
            return this;
        }

        /**
         * @property {Function} setAge sets age to builder Person object
         * @param {number} age person's age
         */
        setAge(age) {
            this.age = age;
            return this;
        }

        /**
         * @property {Function} setMoney sets money to builder Person object
         * @param {number} money amount of money person has
         */
        setMoney(money) {
            this.money = money;
            return this;
        }

        /**
         * @property {Function} build instantiates new instance of Person
         * @returns {Person} Person class instance
         */
        build() {
            const person = new Person(
                this.name,
                this.age,
                this.money
            )

            return person;
        }
    }

    /**
     * Constructor for Person class. Allows to create Person object
     * @param {string} name user name
     * @param {number} age user age
     * @param {number} money current amount of money. Random between 150 - 250.
     */
    constructor(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }

    /**
     * @property {Function} toString turns person class to formatted string.
     * @returns {string} formatted blurb about the Person class
     */
    toString() {
        return `Hello ${this.name}!\n` +
               `Current age: ${this.age}\n` +
               `Money: ${this.money}\n`
    }
}

/**
 * @property {Function} createPerson Person object from user inputted data
 * @returns {Person} instance of Person class
 */
function createPerson() {
    console.log("Before we start, I'd love to learn more about you!\n");

    let name = "";
    let age = -1;
    let hm = "Hm";
    while (true) {
        if (name === "") {
            name = sanitizeStringInput(prompt("What's your name?\t"));
        }

        if (age === -1) {
            age = sanitizeNumberInput(prompt("How old are you?\t"));
        }

        if (name != "" && age != -1) {
            break;
        }

        console.log(`${hm}. I think I heard wrong. Let me ask again.`);
        hm += "m";
    }

    // Separate from next prompts.
    console.log("\n");

    // Generate random number between 150 - 250.
    let money = Math.floor(Math.random() * (150 + 1) + 100);

    return new Person.Builder()
        .setName(name)
        .setAge(age)
        .setMoney(money)
        .build();
}

export {Person, createPerson};
