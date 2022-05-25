const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts');

/*mongoose.connect('mongodb+srv://rouzexsd:1663RZXsd@cluster0.5u1vd.mongodb.net/meanApp?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database');
  }).catch((error) => {
  console.log('Connection Failed: ', error);
})*/


mongoose.connect('mongodb://localhost/meanApp')
  .then(() => {
    console.log('Connected to database');
  }).catch((error) => {
  console.log('Connection Failed: ', error);
})

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS, PUT'
  )
  next();
})

app.use('/api/posts', postRouter);

module.exports = app;
