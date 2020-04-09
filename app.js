// this is to import the fs module to this JS file
const fs = require('fs')
// writeFileSync is to create a file and to write into it..
fs.writeFileSync('notes.txt', 'this file was created by Node.js')
// appendFileSync is append a line or text to a existing file..
//if the file doesnt exists then it will create a new file..
fs.appendFileSync('notes.txt', ' My name is Anirup..I live in bangalore')

const name = 'Anirup'
console.log(name)

// now I created a  new file named utils.js and have a console statement in it..
// and run node app.js in terminal.. and the output is still Anirup but not the console
// in utils.js

require('./utils.js')
console.log('My name is ' +name)

// output is 
//Anirup - line 9
//utils.js - in utils.js file
//My name is Anirup - line 17

// All files in Node have their own scope. i.e app.js cant access the variables
// or constants in utils.js - this is very important
// even though we are loading the file with require 

// altough its possible if defined explictely using module.exports
const friendName = require('./utils.js')
console.log('lets try to print the var in utils.js file')
console.log(friendName)

// now lets try to export a function from utils.js.
const add = require('./utils.js')
// add is the function which is declared in utils.js file 
const sum = add(2, 10)
console.log(sum)

// create a new file manually notes.js
// declare a function in notes.js named getNotes() which would return a string
// export the function from notes.js
// print the message here 
const getNotesFn = require('./notes.js')
console.log(getNotesFn())


// importing npm modules
// run npm -v and see the version.
// then run npm init and it wil ask few questions to which we have to click on enter
// the package.json file will be created.

// goto npmjs.com and search for validator package 
// then lets install the validator package using npm i validator 
// with this a new foler gets created named : package-lock.json, node-modules, 
// and a new object in the package.json named dependencies
// node_modules folder will have all the packages installed in the project 

const validator = require('validator')
console.log(validator.isEmail('anirup049@gmail.com')) // will return true
console.log(validator.isEmail('anirup049@gmail'))     // will return false
console.log(validator.isURL('https://stage.rapidobuild.com/')) // will return true
console.log(validator.isURL('https://stage.rapidobuild.com1/')) // will return false


// use the chalk lib in ur project
// install 2.4.1 of chalk
// load chalk into app.js
// use to print success in green
const chalk = require('chalk')
console.log(chalk.green('Success'))
console.log(chalk.bold.green('Success'))
console.log(chalk.green.bold('Success'))
console.log(chalk.green.inverse.bold('Success'))
