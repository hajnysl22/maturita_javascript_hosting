const express = require('express');
const { addNote, getNotes, deleteNote, toggleImportant } = require('../notes');
const router = express.Router();

router.get('/:username', async (req, res) => {
    const { important } = req.query;
    const notes = await getNotes(req.params.username, important === 'true');
    res.json(notes);
});

router.post('/:username', async (req, res) => {
    const { title, text } = req.body;
    const note = await addNote(req.params.username, title, text);
    res.json(note);
});

router.delete('/:username/:index', async (req, res) => {
    await deleteNote(req.params.username, parseInt(req.params.index));
    res.json({ success: true });
});

router.put('/:username/:index/toggle-important', async (req, res) => {
    await toggleImportant(req.params.username, parseInt(req.params.index));
    res.json({ success: true });
});

module.exports = router;
