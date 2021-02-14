const express = require('express');

const jks = require('./routes/jokes.js');

const app = express();

app.use('/api', jks);

app.get('/', ((req, res) => {
    res.send('Zdravo!');
}));

app.listen(80);
