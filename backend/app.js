const express = require('express');

const app = express();

app.use("/api/posts", (req, res, next) => {
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
