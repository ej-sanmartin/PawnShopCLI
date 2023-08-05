const prompt = require("prompt-sync")();

// Example test.
const example = () => "Hola.";

class Person {
    name = null;
    age = null;
    money = null;

    static Builder = class {
        name = null;
        age = null;
        money = null;

        setName(name) {
            this.name = name;
            return this;
        }

        setAge(age) {
            this.age = age;
            return this;
        }

        setMoney(money) {
            this.money = money;
            return this;
        }

        build() {
            const person = new Person(
                this.name,
                this.age,
                this.money
            )

            return person;
        }
    }

    constructor(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }

    toString() {
        return `Hello ${this.name}!\n` +
               `Current age: ${this.age}\n` +
               `Money: ${this.money}\n`
    }
}

function create_person() {
    console.log("Before we start, I'd love to learn more about you!\n");

    let name = prompt("What's your name?\t");
    let age = prompt("How old are you?\t");

    // Generate random number between 150 - 250.
    let money = Math.floor(Math.random() * (150 + 1) + 100);

    return new Person.Builder()
        .setName(name)
        .setAge(age)
        .setMoney(money)
        .build();
}

function main() {
    let player = create_person();
    console.log(player.toString());
}

main()

exports.example = example;