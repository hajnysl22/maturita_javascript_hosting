const express = require('express');
const { register, login, deleteAccount } = require('../auth');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, consent } = req.body;
    const result = await register(username, password, consent);
    res.json(result);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.json(result);
});

router.delete('/account', async (req, res) => {
    const { username, password } = req.body;
    const result = await deleteAccount(username, password);
    res.json(result);
});

module.exports = router;
