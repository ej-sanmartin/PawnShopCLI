import {assert} from 'chai';

import {removeCommasAndShift,
       sanitizeNumberInput,
       sanitizeStringInput} from '../prompt_utils.js';

describe('removeCommasAndShift Tests:', () => {
    it("Does not change string if no commas", () => {
        let result = removeCommasAndShift("a");
        assert.equal(result, "a");
    });

    it("Remove comma from single number", () => {
        let result = removeCommasAndShift("1,000");
        assert.equal(result, "1000");
    });

    it("Remove commas from multiple words string", () => {
        let result = removeCommasAndShift("Me, Myself, and I");
        assert.equal(result, "Me Myself and I");
    });

    it("Empty string returns empty output", () => {
        let result = removeCommasAndShift("");
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

     it("Remove commas", () => {
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