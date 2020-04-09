const fs = require('fs')
const chalk = require('chalk')

const getNots = () => {
    return 'Your Notes...'
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    if(notes.length > 0) {
        // filter is going to go through all the records af the arraybundleRenderer.
        // but thats something we dont want.
        // we can use find instead of filter
        const duplicateNote = notes.find((note) => {
            if(note.title === title) {
                return true
            } else {
                return false
            }
        })
        // after this duplicateNote array will contain the duplicate record
        // else it will be undefined
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

const readNote = (title) => {
    console.log(title)
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title )
    console.log('-------Lets see what we have found------')
    if(findNote) {
        console.log(chalk.green.inverse(findNote.title))
        console.log(chalk.green.inverse(findNote.body))
    } else {
        console.log(chalk.red.inverse('Note not found !'))
    }
    
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
    listNotes: listNotes,
    readNote: readNote
}
