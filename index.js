// @ts-check

const { createPerson } = require('./person');

/**
 * @property {Function} main entry point to this CLI program
 */
function main() {
    let player = createPerson();
    console.log(player.toString());
}

main()
