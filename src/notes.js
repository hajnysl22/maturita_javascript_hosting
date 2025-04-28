const db = require('./db');

function getUsers() {
    return db.get('users') || {};
}

function saveUsers(users) {
    db.set('users', users);
}

function addNote(username, title, text) {
    const users = getUsers();
    const note = {
        title,
        text,
        created: new Date().toISOString(),
        important: false
    };
    users[username].notes.unshift(note);
    saveUsers(users);
    return note;
}

function getNotes(username, onlyImportant = false) {
    const users = getUsers();
    let notes = users[username].notes || [];
    if (onlyImportant) {
        notes = notes.filter(note => note.important);
    }
    return notes;
}

function deleteNote(username, index) {
    const users = getUsers();
    users[username].notes.splice(index, 1);
    saveUsers(users);
}

function toggleImportant(username, index) {
    const users = getUsers();
    users[username].notes[index].important = !users[username].notes[index].important;
    saveUsers(users);
}

module.exports = { addNote, getNotes, deleteNote, toggleImportant };
