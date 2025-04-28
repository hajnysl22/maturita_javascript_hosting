const express = require('express');
const { addNote, getNotes, deleteNote, toggleImportant } = require('../notes');
const router = express.Router();

router.get('/:username', (req, res) => {
    const { important } = req.query;
    const notes = getNotes(req.params.username, important === 'true');
    res.json(notes);
});

router.post('/:username', (req, res) => {
    const { title, text } = req.body;
    const note = addNote(req.params.username, title, text);
    res.json(note);
});

router.delete('/:username/:index', (req, res) => {
    deleteNote(req.params.username, parseInt(req.params.index));
    res.json({ success: true });
});

router.put('/:username/:index/toggle-important', (req, res) => {
    toggleImportant(req.params.username, parseInt(req.params.index));
    res.json({ success: true });
});

module.exports = router;
