const bcrypt = require('bcryptjs');
const db = require('./db');

function getUsers() {
    return db.get('users') || {};
}

function saveUsers(users) {
    db.set('users', users);
}

function register(username, password, consent) {
    const users = getUsers();
    if (!consent) return { success: false, message: "Souhlas je povinný." };
    if (users[username]) return { success: false, message: "Jméno již existuje." };

    const hashed = bcrypt.hashSync(password, 10);
    users[username] = { password: hashed, notes: [] };
    saveUsers(users);
    return { success: true };
}

function login(username, password) {
    const users = getUsers();
    const user = users[username];
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return { success: false, message: "Neplatné přihlášení." };
    }
    return { success: true };
}

function deleteAccount(username, password) {
    const users = getUsers();
    const user = users[username];
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return { success: false, message: "Špatné heslo." };
    }
    delete users[username];
    saveUsers(users);
    return { success: true };
}

module.exports = { register, login, deleteAccount };
