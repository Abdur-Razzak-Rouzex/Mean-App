const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  try {
    const updatedPost = await Post.updateOne({_id: req.params.id}, post);
    res.status(200).json({
      post: updatedPost,
      message: 'Post was updated successfully'
    });
  }catch (error) {
    console.log('PUT request error: ', error);
    res.status(400).json({success: false})
  }
})

router.get('', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: posts
    })
  } catch (error) {
    console.log('GET request error: ', error);
    res.status(400).json({success: false})
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post) {
      res.status(200).json({
        message: 'Post fetched successfully',
        post
      })
    }else {
      res.status(400).json({message: 'Post Not Found'});
    }

  } catch (error) {
    console.log('GET request error: ', error);
    res.status(400).json({success: false})
  }
})

router.delete('/:id', async (req, res, next) => {
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

module.exports = router;
