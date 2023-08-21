import {assert} from 'chai';

import {createStore} from '../store.js';

describe('Store Class Tests:', () => {
    it("Store class properly initialized", () => {
        let store = createStore();

        let storeName = store.name;
        let inventory = store.inventory;
        let item = inventory.get("GOLD");

        assert.equal(storeName, "Ed's");
        assert.equal(item.price, 500);
        assert.strictEqual(item.quantity, 1);
    });

    it("maybeBuy successful purchase", () => {
        let store = createStore();

        let transactionResult = store.maybeBuy(/*selected_item=*/"BITE",
                                               /*quantity=*/2, /*money=*/20);
        
        let result = transactionResult.result;
        let remaining_money = transactionResult.money;

        assert.isTrue(result);
        assert.strictEqual(remaining_money, 0);
    });

    it("maybeBuy rejects if insufficient balance", () => {
        let store = createStore();

        let transactionResult = store.maybeBuy(/*selected_item=*/"BITE",
                                               /*quantity=*/2, /*money=*/10);
        
        let result = transactionResult.result;
        let remaining_money = transactionResult.money;

        assert.isFalse(result);
        assert.equal(remaining_money, 10);
    });

    it("maybeBuy removes item when no longer available", () => {
        let store = createStore();

        let transactionResult = store.maybeBuy(/*selected_item=*/"GOLD",
                                               /*quantity=*/1, /*money=*/500);
        
        let result = transactionResult.result;
        let remaining_money = transactionResult.money;

        assert.isTrue(result);
        assert.equal(remaining_money, 0);

        let gold = store.inventory.get("GOLD");
        assert.isUndefined(gold);
    });
});