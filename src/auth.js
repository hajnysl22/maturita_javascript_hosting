const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function register(username, password, consent) {
    if (!consent) return { success: false, message: "Souhlas je povinný." };

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return { success: false, message: "Jméno již existuje." };
    }

    const hashed = bcrypt.hashSync(password, 10);
    const user = new User({ username, password: hashed, notes: [] });
    await user.save();

    return { success: true };
}

async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return { success: false, message: "Neplatné přihlášení." };
    }
    return { success: true };
}

async function deleteAccount(username, password) {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return { success: false, message: "Špatné heslo." };
    }
    await User.deleteOne({ username });
    return { success: true };
}

module.exports = { register, login, deleteAccount };
