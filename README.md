# PawnShopCLI

## Background

I volunteer to teach at [Code Next](https://codenext.withgoogle.com), a program that works with high schoolers to cultivate the next generation of Black, Latinx, and Indigenous tech leaders.

In Code Next, I TA and lead classes related to Game Development and Introductory Programming in JavaScript and Python.

An assignment the students had was creating a CLI application in JavaScript where they had to take user inputs and do something interesting with it. For example, some students created a CLI store front, while others created a tip calculator.

This session only lasted the summer but I was immensely impressed at the speed students were picking up coding and learning general computer science concepts. Comparatively, it took me years to be comfortable programming.

My time at Code Next made me realize how important exposure in software engineering early on in life as these students have all this time now to learn and fail and learn from their failures. All while growing to become future and fulfilled tech leaders.

As a challenge, I had joked around with the other Code Next coaches that I would be working on this assignment, mostly to understand the challenges these students faced while quickly developing their own CLI apps.

What I thought would take me a day ended up taking me a month of development to complete. However, time was spent doing my full time job, other personal and professional projects, and the other things in life that pop up and make time fast forward.

Ultimately, though, I wanted to make this project as polished as I could, which means careful planning and thoughtful coding.

## Challenges

There were many little challenges that contributed to the lengthy development time but the main roadblock that could be narrowed down is: unit testing.

At Google, there is a strong culture where all code needs to be thoroughly unit tested and so I wanted to apply this to my personal works. Even though unit tests are slow to get working and a bit head scratching at times, they prove a vital part of ensuring code has been checked over rigorously at least once in the span it takes to write a unit test.

I got to use common JavaScript testing frameworks like Mocha and also mock and spy libraries like Sinon which was fun after the hours it took to debug and refactor my code to be in a testable state.

## Current State

This CLI application allows you to input your name and age. Then a random amount of play money is put into your account with which you can buy digital items in the Pawn Shop.

You are then given the option to ```Buy```, ```Save```, or ```Exit```.

"Save" doesn't work yet and "Exit" kicks you out of the store so "Buying" is the only available option you will be able to interact with.

More features coming soon!

## Setup Guide

You can run:

    $ gh repo clone ej-sanmartin/PawnShopCLI

    $ cd PawnShopCLI

    $ npm start

Docker image with setup guide for that coming soon!

## Wishlist of features

* Dockerize repo so others can easily run this app
* Ability for player to check what items they have
* "Sell" action, player sells there item to the shop
* Full feature "Save" action, connect / save data to a database
* "Advice" action, store clerk will dispense some wisdom for ya
* Fix jsdoc / ts-check error in main.js
* Create Store based on argument path provided JSON file
* Handle escape and exit commands gracefully
* Clean up console.log message format to something neater
* Add ASCII art to various prompts and console.logs
* Remove unneeded npm dependencies
* 90% > test coverage
* Ability to mock prompt-sync-plus

## Contributors

* Edgar San Martin @ej-sanmartin