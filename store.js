// @ts-check

/**
 * Transaction object to hold if the transaction went through and money left
 * @typedef {Object} TransactionResult
 * @property {boolean} result if this transaction succeeded
 * @property {number} money money remaining after transaction takes place
 */

/**
 * @typedef {Object} ItemInfo
 * @property {number} price price of item
 * @property {number} quantity how much of this item is available to buy
 */

/**
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
        let item = this.inventory.get(selected_item);

        if (item === undefined) {
            console.log("I think I heard you wrong. This doesn't exist.\n");
            return {result: false, money: money};
        }

        if (item.quantity < quantity) {
            console.log("Sorry, we do not have enough to sell.\n");
            return {result: false, money: money};
        }

        item.quantity -= quantity;
        this.inventory.set(selected_item, item);

        this.checkIsItemOutOfStock(selected_item);

        let items_cost = item.price * quantity;

        if (items_cost > money) {
            console.log("Not enough money.\n");
            return {result: false, money: money};
        }

        let money_remaining = money - items_cost;
        return {result: true, money: money_remaining};
     }

     /**
      * Checks if item is still in stock. If it isn't, remove from inventory
      * @private
      * @property {Function} checkIsItemOutOfStock
      * @param {string} selected_item item in inventory that is being evaluated
      * @returns void
      */
     checkIsItemOutOfStock(selected_item) {
        let item = this.inventory.get(selected_item);

        // Method is private, thus nearly surely ever going to exist when called
        if (item?.quantity === 0) {
            console.log("Looks like you got the last one.\n");
            this.inventory.delete(selected_item);
        }
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

exports.Store = Store;
exports.createStore = createStore;
