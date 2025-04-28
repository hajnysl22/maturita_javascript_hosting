// models/User.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    text: String,
    created: { type: Date, default: Date.now },
    important: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    notes: [noteSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
