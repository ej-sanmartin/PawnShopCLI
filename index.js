const prompt = require("prompt-sync")();

// Example test.
const example = () => "Hola.";

function main() {
    let example = prompt("Please enter anything.\t");
    console.log(example);
}

main()

export default {
    example,
};