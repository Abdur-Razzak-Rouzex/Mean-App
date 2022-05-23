const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

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
    'GET, POST, PATCH, DELETE, OPTIONS'
  )
  next();
})

app.post('/api/posts', async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  const newPost = await post.save();

  res.status(201).json({
    message: 'Post was created successfully',
    postId: newPost?.id
  })
})

app.get('/api/posts', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: posts
    })
  } catch (error) {
    console.log('get request error: ', error);
    res.status(400).json({success: false})
  }
})

app.delete('/api/posts/:id', async (req, res, next) => {
  try {
    const post = await Post.find({_id: req.params.id});

    if (post) {
      await Post.remove({_id: req.params.id});
      res.status(200).json({message: 'Post Deleted Successfully'});
    } else {
      res.json({
        success: false,
        message: 'Post not found'
      })
    }
  } catch (error) {
    console.log('Delete request error: ', error);
    res.status(400).json({success: false})
  }
})

module.exports = app;
