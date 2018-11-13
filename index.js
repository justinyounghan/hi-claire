require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const UserRoute = require('./routes/user');
const TodoRoute = require('./routes/todo');
const ScapeRoute = require('./routes/scape');

var PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PATH = `mongodb://${process.env.MONGODB_USERNAME}:${
  process.env.MONGODB_PASSWORD
}@ds259912.mlab.com:59912/claire`;

const LOCAL = 'mongodb://localhost/claire';

mongoose.connect(
  PATH,
  (err, res) => {
    if (err) {
      console.log('failed to connect to db');
    } else {
      console.log('connected to the database!');
    }
  }
);

app.use(UserRoute);
app.use(TodoRoute);
app.use(ScapeRoute);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log('claire is online!');
  console.log('maximum effort!');
});
