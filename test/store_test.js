const assert = require('chai').assert;

const {createStore} = require('../store');

describe('Store class Tests:', () => {
    it("Placeholder Store class initialized", () => {
        let store = createStore();
        let store_name = store.name;
        let inventory = store.inventory;
        assert.equal(store_name, "Pawn Shop");
        assert.isArray(inventory);
        assert.equal(inventory.length, 0);
    })
});