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
//console.log(getNotesFn())


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

// chalk and validators are locally installed modules 


// global npm modules and packages
// install module nodemon using command : sudo npm i nodemon -g
// nodemon is for running the process and see the changes when we save the file..
// nodemon is to restart the script.. but for this we need to run as: nodemon app.js 
// instead of node app.js

// File system and command line args
// try to run : node app.js Anirup (here Anirup is passed as an argument)
//console.log(process.argv)

// run with : node app.js add 
// node app.js remove
const command = process.argv[2]
if(command === 'add') {
    console.log('Adding Notes !')
} else if(command === 'remove') {
    console.log('Removing note !')
}

// try this : node app.js --title="New title !"


// Agrument parsing with Yargs
// add yargs module to project : npm i yargs

const yargs = require('yargs')
console.log('lets test yargs')
//console.log(yargs.argv)

// run this: node app.js add --title="Anirup"
// run: node app.js --help
// run: node app.js --version

// customize yargs version
yargs.version('2.1.0')
//console.log(yargs.argv)

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // to make tht title argument mandatory
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        // console.log('Adding a new note !', argv.title)
        // console.log('Adding body to new note', argv.body)
        // instead of these console statements, we can call the methods in notes.ts file
        getNotesFn.addNotes(argv.title, argv.body)
    }
})
//console.log(yargs.argv)

// Run: node app.js --help
// Run: node app.js add

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'To remove a note',
    builder: {
        title: {
            describe: 'Remove the title',
            demandOption: true
        }
    },
    handler: function(argv) {
      //  console.log('removing a note !')
      getNotesFn.removeNote(argv.title)
    }
})
//console.log(yargs.argv)

// Create list command
yargs.command({
    command: 'list',
    describe: 'Listing a note',
    handler: function() {
        console.log('Note listed !')
    }
})
//console.log(yargs.argv)

// Create read command
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler: function() {
        console.log('Note Read !')
    }
})
//console.log(yargs.argv)

// now to all these commands above we need to add the builder property

yargs.parse() // it will parse all the yargs.. we can use this in place of console.log

// Add an options to yargs
// set up a body option for the add command
// Configure a description, make it required and for it to be string
// Log the body value in the handler function

// Set up the remove command to take the required title option
// create and export a remove note function in notes.js
// call removeNote in remove command handler
// Have removeNote log the title of the note to be removed
// Test your work using : node app.js remove --title="some title"

// Use Chalk to provide useful logs for remove
// If a note is removed, print 'Note removed' with a green background
// If no note is  removed, print 'No note removed' with a red background


