const fs = require('fs')

const getNots = function() {
    return 'Your Notes...'
}

const addNotes = function(title, body) {
    const notes = loadNotes()
    if(notes.length > 0) {
        const duplicateNotes = notes.filter(function(note) {
            if(note.title === title) {
                return true
            } else {
                return false
            }
        })
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

// generic method to laod the notes
const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    } 
}

// generic method to save new notes
const saveNotes = function(notes) {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

// with this we can just export one single object at a time
//module.exports = getNots

module.exports = {
    getNots: getNots,
    addNotes: addNotes
}
