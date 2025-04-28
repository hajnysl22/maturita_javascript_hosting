const User = require('./models/User');

async function addNote(username, title, text) {
    const user = await User.findOne({ username });
    if (!user) return null;

    const note = {
        title,
        text,
        created: new Date(),
        important: false
    };

    user.notes.unshift(note);
    await user.save();

    return note;
}

async function getNotes(username, onlyImportant = false) {
    const user = await User.findOne({ username });
    if (!user) return [];

    let notes = user.notes;
    if (onlyImportant) {
        notes = notes.filter(note => note.important);
    }
    return notes;
}

async function deleteNote(username, index) {
    const user = await User.findOne({ username });
    if (!user) return;

    user.notes.splice(index, 1);
    await user.save();
}

async function toggleImportant(username, index) {
    const user = await User.findOne({ username });
    if (!user) return;

    user.notes[index].important = !user.notes[index].important;
    await user.save();
}

module.exports = { addNote, getNotes, deleteNote, toggleImportant };
