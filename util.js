// @ts-check

/**
 * @param {number} day datetime stores days of the week as number
 * @returns {string} convert the number to a string day of the week
 */
function toDayOfTheWeek(day) {
    switch(day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday"
    }

    // Failure case if something goe wrong. This is a neutral message to output.
    return "day";
}

exports.toDayOfTheWeek = toDayOfTheWeek;
