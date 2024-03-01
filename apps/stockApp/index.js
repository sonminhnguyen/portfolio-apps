var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const autoUpdateData = require('./src/schwab/autoUpdateData.js')
autoUpdateData();

var apiRouter = require('./routes/api.js');

var app = express();

const publicPath = path.join(__dirname, './public')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
