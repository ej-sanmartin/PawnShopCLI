const assert = require('chai').assert;

const {Choice, choiceParser} = require('../choice');

describe("Choice tests:", () => {
    it("Choice.Buying works", () => {
        let testChoice1 = choiceParser("1");
        let testChoice2 = choiceParser("1.");
        let testChoice3 = choiceParser("buying");

        assert.equal(testChoice1, Choice.Buying);
        assert.equal(testChoice2, Choice.Buying);
        assert.equal(testChoice3, Choice.Buying);
    });

    it("Choice.Saving works", () => {
        let testChoice1 = choiceParser("2");
        let testChoice2 = choiceParser("2.");
        let testChoice3 = choiceParser("saving");

        assert.equal(testChoice1, Choice.Saving);
        assert.equal(testChoice2, Choice.Saving);
        assert.equal(testChoice3, Choice.Saving);
    });

    it("Choice.Exiting works", () => {
        let testChoice1 = choiceParser("3");
        let testChoice2 = choiceParser("3.");
        let testChoice3 = choiceParser("exiting");

        assert.equal(testChoice1, Choice.Exiting);
        assert.equal(testChoice2, Choice.Exiting);
        assert.equal(testChoice3, Choice.Exiting);
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