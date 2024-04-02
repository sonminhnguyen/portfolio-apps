const path = require('path') 
const express = require('express')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join((__dirname), './public')

app.set('view engine', 'jade');
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;