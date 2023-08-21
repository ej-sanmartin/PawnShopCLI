import {assert} from 'chai';

import {toDayOfTheWeek} from '../util.js';

describe("toDayOfTheWeek method tests:", () => {
    it("Succeeds on expected use case", () => {
        let output1 = toDayOfTheWeek(0);
        let output2 = toDayOfTheWeek(1);
        let output3 = toDayOfTheWeek(2);
        let output4 = toDayOfTheWeek(3);
        let output5 = toDayOfTheWeek(4);
        let output6 = toDayOfTheWeek(5);
        let output7 = toDayOfTheWeek(6);

        assert.equal(output1, "Sunday");
        assert.equal(output2, "Monday");
        assert.equal(output3, "Tuesday");
        assert.equal(output4, "Wednesday");
        assert.equal(output5, "Thursday");
        assert.equal(output6, "Friday");
        assert.equal(output7, "Saturday");
    });

    it("Handles non 0-6 numbers", () => {
        let output1 = toDayOfTheWeek(-1);
        let output2 = toDayOfTheWeek(7);

        assert.equal(output1, "day");
        assert.equal(output2, "day");
    });
});