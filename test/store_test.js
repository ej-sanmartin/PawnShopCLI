import {assert} from 'chai';
import sinon from 'sinon';

import {Person} from '../person.js';
import {createStore, handleBuy, Store} from '../store.js';

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

describe('Store Prompt Tests:', () => {
    afterEach(() => {
        sinon.restore();
    });

    it("handleBuy catches exit command", () => {
        let mockedPromptOutput = {request: "Exit", quantity: -1};

        let testStore = createStore();
        let testPerson = new Person(/*name=*/"Test", /*age=*/21, /*money=*/200);

        let mock = sinon.mock(testStore);
        mock.expects('handleBuyPrompt').once().returns(mockedPromptOutput);
        mock.expects('doKeepGoing').never();

        let consoleSpy = sinon.spy(console, 'log');
        assert.equal(0, consoleSpy.callCount);

        handleBuy(testStore, testPerson);

        mock.verify();
        mock.restore();
        consoleSpy.restore();
    })
});