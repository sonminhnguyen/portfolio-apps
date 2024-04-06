const path = require('path');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/apps/expensifyApp', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app