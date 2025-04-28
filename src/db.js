const SimpleJsonDB = require('simple-json-db');
const path = require('path');
const db = new SimpleJsonDB(path.resolve(__dirname, 'data.json'));
module.exports = db;
