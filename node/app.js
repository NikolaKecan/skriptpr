const express = require('express');
const jks = require('./routes/jokes.js');
const history = require('connect-history-api-fallback');
const path = require('path');


const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use('/api', jks);

const staticDir = express.static(path.join(__dirname, 'dist'))

//ukljucimo middleware-ove
app.use(staticDir);
app.use(history);
app.use(staticDir);

app.listen(80);