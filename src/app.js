const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');

const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server běží na http://localhost:${PORT}`));
