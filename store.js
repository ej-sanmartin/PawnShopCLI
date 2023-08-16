// @ts-check

const { create } = require("domain");

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
         * @type {Array<Object>} items and their prices that are for sale
         */
        inventory;

        /**
         * @property {Function} setName sets name to builder Store object
         * @param {string} name Store name
         * @returns {Store}
         */
        setName(name) {
            this.name = name;
            return this;
        }

        /**
         * @property {Function} setInventory sets inventory to builder object
         * @param {Array<Object>} inventory list of items for sale
         * @returns {Store}
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
     * @param {Array<Object>} inventory items for sale
     */
    constructor(name, inventory) {
        this.name = name;
        this.inventory = inventory;
    }
}

function createStore() {
    let inventory = [];
    return new Store.Builder()
        .setName("Pawn Shop")
        .setInventory(inventory)
        .build();
}

exports.Store = Store;
exports.createStore = createStore;
