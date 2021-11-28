
const express = require("express");

const router = express.Router();

const Post = require("../models/post");

router.post("", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    post.save().then((x) => {
      res.status(201).json({ message: "Post added successfully!", id: x._id });
    });
  });
  
  router.get("/:id", (req, res, next) => {
    Post.find({ _id: req.params.id }).then(x => {
      console.log(x);
      res.status(200).json({ message: "Post fetched successfully!", post: x });
    });
  });
  
  router.put("/:id", (req, res, next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
    });
    Post.updateOne(
      {
        _id: req.params.id,
      },
      post
    ).then((x) => {
      console.log(x);
      res.status(200).json({ message: "Post updated successfully!" });
    });
  });
  
  router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then((x) => {
      console.log(x);
      res.status(200).json({ message: "Post deleted successfully!" });
    });
  });
  
  router.use("", (req, res, next) => {
    const posts = [
      {
        id: 1,
        title: "First post from backend",
        content: "Content of the first post from backend",
      },
      {
        id: 2,
        title: "Second post from backend",
        content: "Content of the second post from backend",
      },
    ];
  
    Post.find().then((documents) => {
      res
        .status(200)
        .json({ message: "Posts fetched successfully!", posts: documents });
    });
  });

  module.exports = router;
  