// @ts-check

import psp from "prompt-sync-plus";

import {Person} from './person.js';
import {sanitizeNumberInput, sanitizeStringInput} from './prompt_utils.js';

const prompt = psp(undefined);

/**
 * Transaction object to hold if the transaction went through and money left
 * @typedef {Object} TransactionResult
 * @property {boolean} result if this transaction succeeded
 * @property {number} money money remaining after transaction takes place
 */

/**
 * Each individual item in a store's inventory
 * @typedef {Object} ItemInfo
 * @property {number} price price of item
 * @property {number} quantity how much of this item is available to buy
 */

/**
 * Input from prompt about what the customer wants and, if applicable, how much
 * @typedef {Object} CustomerRequest
 * @property {string} request item or action that customer wants
 * @property {number} quantity number of items customer wants to buy
 */

/**
 * Everything the shops has, currently
 * @typedef {Map<string, ItemInfo>} Inventory
 */

/** Class that holds data on store and an API for users to interact with. */
class Store {
    name;
    inventory;

    /** Builder helper class to create Person class. */
    static Builder = class {
        /**
         * @type {string}
         */
        name;
        /**
         * @type {Inventory} items and their prices that are for sale
         */
        inventory;

        /**
         * @property {Function} setName sets name to builder Store object
         * @param {string} name Store name
         */
        setName(name) {
            this.name = name;
            return this;
        }

        /**
         * @property {Function} setInventory sets inventory to builder object
         * @param {Inventory} inventory list of items for sale
         */
        setInventory(inventory) {
            this.inventory = inventory;
            return this;
        }

        /**
         * @property {Function} build
         * @returns {Store}
         */
        build() {
            const store = new Store(
                this.name,
                this.inventory
            )

            return store;
        }
    }

    /**
     * Constructor for Store class.
     * @param {string} name Store name
     * @param {Inventory} inventory items for sale and their price
     */
    constructor(name, inventory) {
        this.name = name;
        this.inventory = inventory;
    }

    /**
     * @property {Function} 
     * @param {string} selected_item item chosen to be bought
     * @param {number} quantity how many to buy
     * @param {number} money how much money buyer has
     * @returns {TransactionResult} if buy possible and Player remaining balance
     */
    maybeBuy(selected_item, quantity, money) {
        let item = this.inventory.get(selected_item.toUpperCase());

        if (item === undefined) {
            console.log("I think I heard you wrong. This doesn't exist.\n");
            return {result: false, money: money};
        }

        if (item.quantity < quantity) {
            console.log("Sorry, we do not have enough to sell.\n");
            return {result: false, money: money};
        }

        let items_cost = item.price * quantity;

        if (items_cost > money) {
            console.log("Not enough money.\n");
            return {result: false, money: money};
        }

        item.quantity -= quantity;

        if (item.quantity == 0) {
            console.log("Looks like you got the last one.\n");
            this.inventory.delete(selected_item);
        } else {
            this.inventory.set(selected_item, item);
        }

        let money_remaining = money - items_cost;
        return {result: true, money: money_remaining};
    }

     displayInventory() {
        console.log("Item______________Price___Qty");
        for (const [itemName, itemInfo] of this.inventory) {
            console.log(`${itemName}______________${itemInfo.price}______${itemInfo.quantity}`);
        }
     }
}

/**
 * @property {Function} createStore generates Store class to interact with
 * @returns {Store}
 */
function createStore() {
    let inventory = new Map();
    inventory.set("BITE", {price: 10, quantity: 20});
    inventory.set("MEAT", {price: 20, quantity: 6});
    inventory.set("COKE", {price: 15, quantity: 12});
    inventory.set("BOOK", {price: 60, quantity: 7});
    inventory.set("GOLD", {price: 500, quantity: 1});

    return new Store.Builder()
        .setName("Ed's")
        .setInventory(inventory)
        .build();
}

/**
 * 
 * @param {Store} store facility being interacted with
 * @returns {CustomerRequest} a struct like object that contains the customers experience traveling on company dime
 */
function handleBuyPrompt(store) {
    let requested_item = "";
    let quantity = -1;
    while (true) {
        store.displayInventory();
        console.log("EXIT\n")

        if (requested_item === "") {
            requested_item = sanitizeStringInput(prompt("Whatya buying?\n"));
        }

        if (requested_item === "Exit") {
            break;
        }

        if (quantity === -1) {
            quantity = sanitizeNumberInput(prompt("How many?\t"));
        }

        if (requested_item != "" && quantity > 0) {
            break;
        }

        console.log("What was that?\n");
    }

    return {request: requested_item, quantity: quantity};
}

/**
 * @property {Function} doKeepGoing whether player wants to continue
 * @returns {boolean} whether player wants to continue. False is no, True is yes
 */
function doKeepGoing() {
    let result;
    while (true) {
        let response = sanitizeStringInput(prompt("Anything else? (yN)\n"));

        if (response === "Y") {
            result = true;
            break;
        } else  if (response === "N") {
            result = false;
            break;
        }

        console.log("Sorry, something's in my ear.\n");
    }

    return result;
}

/**
 * 
 * @param {Store} store store that player is interacting with
 * @param {Person} customer the player is represented as a 'customer'
 * @returns {Person} because JS is pass-by-value type language, returns updated
 * Person object
 */
function handleBuy(store, customer) {
    while (true) {
       let customerRequest = handleBuyPrompt(store);

       if (customerRequest.request === "Exit\n") {
        break;
       }

       let result = store.maybeBuy(customerRequest.request,
                                   customerRequest.quantity, customer.money);

       if (result.result === true) {
            customer.money = result.money;
            let keepGoing = doKeepGoing();
            if (keepGoing) continue;
            break;
       }
    }

    console.log("Exiting store...\n");
    return customer;
}

export {createStore, handleBuy, Store};
