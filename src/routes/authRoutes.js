const express = require('express');
const { register, login, deleteAccount } = require('../auth');
const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password, consent } = req.body;
    const result = register(username, password, consent);
    res.json(result);
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const result = login(username, password);
    res.json(result);
});

router.delete('/account', (req, res) => {
    const { username, password } = req.body;
    const result = deleteAccount(username, password);
    res.json(result);
});

module.exports = router;
