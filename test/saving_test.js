import sinon from 'sinon';

import {handleSaving} from '../saving.js';

describe("Saving helper method tests:", () => {
    afterEach(() => {
        sinon.restore();
    });

    // Spies on console.log to ensure proper messages are outputted
    it("Placeholder for unimplemented save feature", () => {
        let spy = sinon.spy(console, 'log');
        handleSaving();
        sinon.assert.calledOnce(spy.withArgs(sinon.match("Unable")));
        spy.restore();
    });
});