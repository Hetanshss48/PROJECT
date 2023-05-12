const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router
  .post("/", async (req, res) => {
    try {
      const posts = await Post.getAllPosts(req.body);
      console.log(posts);
      res.send(posts);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .post("/edit", async (req, res) => {
    try {
      let post = await Post.editPost(req.body);
      res.send({ success: "Your post has been updated successfully!!!:)" });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .delete("/delete", async (req, res) => {
    try {
      await Post.deletePost(req.body);
      res.send({ success: "Your post has been deleted sucessfully!!! :`(" });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  .post("/add", async (req, res) => {
    try {
      let post = await Post.add(req.body);
      res.send({ success: "Your post has been sucessfully posted:)" });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  });

module.exports = router;
