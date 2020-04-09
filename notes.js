const fs = require('fs')
const chalk = require('chalk')

const getNots = () => {
    return 'Your Notes...'
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    if(notes.length > 0) {
        const duplicateNotes = notes.filter((note) => {
            if(note.title === title) {
                return true
            } else {
                return false
            }
        })
        // const duplicateNotes = notes.filter(function(note) {
        //     if(note.title === title) {
        //         return true
        //     } else {
        //         return false
        //     }
        // })
        if(duplicateNotes.length === 0) {
            notes.push({
                title: title,
                body: body
            })
            saveNotes(notes)
        } else {
            console.log('Duplicate note !')
        }
    } else {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    }
}

const removeNote = (title) => {
    console.log(title)
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title )
    if(notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse('No Note Removed'))
    } else {
        console.log(chalk.green.inverse('Note Removed'))
    }
    saveNotes(notesToKeep)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes'))
    notes.forEach((note)=> {
        console.log(note.title)
    })
}

// generic method to laod the notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    } 
}

// generic method to save new notes
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

// with this we can just export one single object at a time
//module.exports = getNots

module.exports = {
    getNots: getNots,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes
}
