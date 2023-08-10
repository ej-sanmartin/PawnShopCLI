// @ts-check

const { createPerson } = require('./person');

const Choice = Object.freeze({
    Deciding: Symbol("deciding"),
    Buying: Symbol("buying"),
    Saving: Symbol("saving"),
    Exiting: Symbol("exiting")
})

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
}

/**
 * @property {Function} main entry point to this CLI program
 */
function main() {
    let player = createPerson();
    console.log(player.toString());

    let date = new Date();
    let dayOfTheWeek = toDayOfTheWeek(date.getDay());
    console.log(`Thank you, have a Happy ${dayOfTheWeek}`);
}

main()
