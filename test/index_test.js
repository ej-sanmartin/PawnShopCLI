const assert = require('chai').assert;

const { example } = require('../index');

describe('Index tests.', () => {
    it ("Example function test.", () => {
        let result = example();
        assert.equal(result, "Hola.");
    })
})