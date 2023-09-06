import {assert} from 'chai';
import sinon from 'sinon';

import {Choice, choiceParser, printChoices} from '../choice.js';

describe("Choice tests:", () => {
    it("Choice.Buying works", () => {
        let testChoice1 = choiceParser("1");
        let testChoice2 = choiceParser("1.");
        let testChoice3 = choiceParser("buy");
        let testChoice4 = choiceParser("buying");

        assert.equal(testChoice1, Choice.Buying);
        assert.equal(testChoice2, Choice.Buying);
        assert.equal(testChoice3, Choice.Buying);
        assert.equal(testChoice4, Choice.Buying);
    });

    it("Choice.Saving works", () => {
        let testChoice1 = choiceParser("2");
        let testChoice2 = choiceParser("2.");
        let testChoice3 = choiceParser("save");
        let testChoice4 = choiceParser("saving");

        assert.equal(testChoice1, Choice.Saving);
        assert.equal(testChoice2, Choice.Saving);
        assert.equal(testChoice3, Choice.Saving);
        assert.equal(testChoice4, Choice.Saving);
    });

    it("Choice.Exiting works", () => {
        let testChoice1 = choiceParser("3");
        let testChoice2 = choiceParser("3.");
        let testChoice3 = choiceParser("exit");
        let testChoice4 = choiceParser("exiting");

        assert.equal(testChoice1, Choice.Exiting);
        assert.equal(testChoice2, Choice.Exiting);
        assert.equal(testChoice3, Choice.Exiting);
        assert.equal(testChoice4, Choice.Exiting);
    });

    it("Choice.Deciding works", () => {
        let testChoice = choiceParser("deciding");
        assert.equal(testChoice, Choice.Deciding);
    });

    it("Invalid inputs caught", () => {
        let testChoice1 = choiceParser("");
        let testChoice2 = choiceParser("2..");
        let testChoice3 = choiceParser("savin");
        let testChoice4 = choiceParser("djnsnu");

        assert.equal(testChoice1, Choice.Unknown);
        assert.equal(testChoice2, Choice.Unknown);
        assert.equal(testChoice3, Choice.Unknown);
        assert.equal(testChoice4, Choice.Unknown);
    });
});

describe("Choice helper method tests:", () => {
    afterEach(() => {
        sinon.restore();
    });

    // Spies on console.log to ensure proper messages are outputted
    it("printChoices expected logging", () => {
        let spy = sinon.spy(console, 'log');

        printChoices();

        // Called 3 times when printing all selectable choices plus 1 time after
        assert.equal(4, spy.callCount);

        sinon.assert.notCalled(spy.withArgs(sinon.match("Unknown")));
        sinon.assert.notCalled(spy.withArgs(sinon.match("Deciding")));
        sinon.assert.calledWith(spy.firstCall, sinon.match("Buying"));
        sinon.assert.calledWith(spy.secondCall, sinon.match("Saving"));
        sinon.assert.calledWith(spy.thirdCall, sinon.match("Exiting"));

        spy.restore();
    })
});