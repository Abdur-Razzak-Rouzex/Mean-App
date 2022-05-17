const express = require('express');
const bodyParser = require('body-parser');

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
    'GET, POST, PATCH, DELETE, OPTIONS'
  )
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log('the sent post: ', post);
  res.status(201).json({
    message: 'Post was created successfully'
  })
})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asdfasdf45',
      title: 'Big deal in market',
      content: "Just go and buy something"
    },
    {
      id: "w45tdfs",
      title: 'The reserve in short',
      content: 'The bangladesh bank reserve'
    }
  ]

  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  })
})

module.exports = app;
