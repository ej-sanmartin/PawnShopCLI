import {assert} from 'chai';
import sinon from 'sinon';

import {Person} from '../person.js';
import {createStore, handleBuy, Store} from '../store.js';

describe('Store Class Tests:', () => {
    let store = createStore();

    afterEach(() => {
        sinon.restore();
    });

    it("Store class properly initialized", () => {
        let storeName = store.name;
        let inventory = store.inventory;
        let item = inventory.get("GOLD");

        assert.equal(storeName, "Ed's");
        assert.equal(item.price, 500);
        assert.strictEqual(item.quantity, 1);
    });

    it("maybeBuy successful purchase", () => {
        let transactionResult = store.maybeBuy(/*selected_item=*/"BITE",
                                               /*quantity=*/2, /*money=*/20);
        
        let result = transactionResult.result;
        let remaining_money = transactionResult.money;

        assert.isTrue(result);
        assert.strictEqual(remaining_money, 0);
    });

    it("maybeBuy fails if item is not available for sale", () => {
        let spy = sinon.spy(console, 'log');
        let transactionResult = store.maybeBuy(/*selected_item=*/"BONE",
                                               /*quantity=*/2, /*money=*/20);
        
        let result = transactionResult.result;
        let remaining_money = transactionResult.money;

        sinon.assert.calledWith(spy, sinon.match("I think I heard you wrong."));
        assert.isFalse(result);
        assert.strictEqual(remaining_money, 20);
        spy.restore();
    });

    it("maybeBuy fails if more of item is being bought than is stock", () => {
        let spy = sinon.spy(console, 'log');
        let transactionResult = store.maybeBuy(/*selected_item=*/"BITE",
                                               /*quantity=*/21, /*money=*/20);
        
        let result = transactionResult.result;
        let remaining_money = transactionResult.money;

        sinon.assert
            .calledWith(spy,
                        sinon.match("Sorry, we do not have enough to sell"));
        assert.isFalse(result);
        assert.strictEqual(remaining_money, 20);
        spy.restore();
    });

    it("maybeBuy rejects if insufficient balance", () => {
        let transactionResult = store.maybeBuy(/*selected_item=*/"BITE",
                                               /*quantity=*/2, /*money=*/10);
        
        let result = transactionResult.result;
        let remaining_money = transactionResult.money;

        assert.isFalse(result);
        assert.equal(remaining_money, 10);
    });

    it("maybeBuy removes item when no longer available", () => {
        let transactionResult = store.maybeBuy(/*selected_item=*/"GOLD",
                                               /*quantity=*/1, /*money=*/500);
        
        let result = transactionResult.result;
        let remaining_money = transactionResult.money;

        assert.isTrue(result);
        assert.equal(remaining_money, 0);

        let gold = store.inventory.get("GOLD");
        assert.isUndefined(gold);
    });

    it("displayInventory properly displays items", () => {
        let spy = sinon.spy(console, 'log');
        store.displayInventory();
        sinon.assert
            .calledOnce(
                spy.withArgs(sinon.match("Item______________Price___Qty")));

        // The plus 1 is for the header seen in the assertion above.
        assert.equal(store.inventory.size + 1, spy.callCount);
        spy.restore();
    });
});

describe('Store Prompt Tests:', () => {
    let mock;
    let testStore = createStore();
    let testPerson = new Person(/*name=*/"Test", /*age=*/21, /*money=*/200);

    beforeEach(() => {
        mock = sinon.mock(testStore);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("handleBuy successful purchase and briefly continues", () => {
        let mockedPromptOutput1 = {request: "Bite", quantity: 1};
        let mockedTransactionResult1 = {result: true, money: 190};
        let mockedPromptOutput2 = {request: "Exit", quantity: -1};

        mock.expects('handleBuyPrompt').once().returns(mockedPromptOutput1);
        mock.expects('maybeBuy').once().returns(mockedTransactionResult1);
        mock.expects('doKeepGoing').once().returns(true);
        mock.expects('handleBuyPrompt').once().returns(mockedPromptOutput2);

        handleBuy(testStore, testPerson);

        mock.verify();
        mock.restore();
    });

    it("handleBuy successful purchase and leaves", () => {
        let mockedPromptOutput = {request: "Bite", quantity: 1};
        let mockedTransactionResult = {result: true, money: 190};

        mock.expects('handleBuyPrompt').once().returns(mockedPromptOutput);
        mock.expects('maybeBuy').once().returns(mockedTransactionResult);
        mock.expects('doKeepGoing').once().returns(false);

        handleBuy(testStore, testPerson);

        mock.verify();
        mock.restore();
    });

    it("handleBuy will repeat until valid request", () => {
        let mockedPromptOutput1 = {request: "Gold", quantity: 1};
        let mockedTransactionResult1 = {result: false, money: 200};
        let mockedPromptOutput2 = {request: "Exit", quantity: -1};

        // Goes through a round of asking what the test player wants, the
        // transaction failing, and then the test player choosing to leave when
        // prompted again what they want.
        mock.expects('handleBuyPrompt').once().returns(mockedPromptOutput1);
        mock.expects('maybeBuy').once().returns(mockedTransactionResult1);
        mock.expects('handleBuyPrompt').once().returns(mockedPromptOutput2);
        mock.expects('doKeepGoing').never();

        handleBuy(testStore, testPerson);

        mock.verify();
        mock.restore();
    });

    it("handleBuy catches exit command", () => {
        let mockedPromptOutput = {request: "Exit", quantity: -1};
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