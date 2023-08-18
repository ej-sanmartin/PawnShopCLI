const assert = require('chai').assert;

const {removesCommasAndShift,
       sanitizeNumberInput,
       sanitizeStringInput} = require('../prompt_utils');

describe('removeCommasAndShift Tests:', () => {
    it("Does not change string if no commas", () => {
        let result = removesCommasAndShift("a");
        assert.equal(result, "a");
    });

    it("Removes comma from single number", () => {
        let result = removesCommasAndShift("1,000");
        assert.equal(result, "1000");
    });

    it("Removes commas from multiple words string", () => {
        let result = removesCommasAndShift("Me, Myself, and I");
        assert.equal(result, "Me Myself and I");
    });

    it("Empty string returns empty output", () => {
        let result = removesCommasAndShift("");
        assert.equal(result, "");
    });
})

describe('sanitizeNumberInput Tests:', () => {
     it("Succeeds on best case input", () => {
         let result = sanitizeNumberInput("1");
         assert.equal(result, 1);
     });

     it("Trims and succeeds", () => {
        let result = sanitizeNumberInput("     1     ");
        assert.equal(result, 1);
     });

     it("Fails on non number input", () => {
        let result = sanitizeNumberInput("a");
        assert.equal(result, -1);
     });

     it("Removes commas", () => {
        let result = sanitizeNumberInput("1,000");
        assert.equal(result, 1000);
     });

     it("Fails on potential negative number", () => {
        let result = sanitizeNumberInput("-2");
        assert.equal(result, -1);
     });
});

describe('sanitizeStringInput Tests:', () => {
    it("Succeeds on best case input", () => {
        let result = sanitizeStringInput("A");
        assert.equal(result, "A");
    });

    it("Trims and succeeds", () => {
        let result = sanitizeStringInput("   A  ");
        assert.equal(result, "A");
    });

    it("Capitalizes the first character", () => {
        let result = sanitizeStringInput("all");
        assert.equal(result, "All");
    });
});