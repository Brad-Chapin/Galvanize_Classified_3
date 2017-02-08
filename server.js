'use strict';

const express = require('express');
const app = express();
const path = require("path");
require('dotenv').config();

const messages = require('./routes/classifieds');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/classifieds', messages);
app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
