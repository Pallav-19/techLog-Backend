const express = require("express");
const router = express.Router();
const {
  addPost,
  getPost,
  deletePost,
  editPost,
  getPostById,
} = require("../controllers/post/posts.controller.js");


router.get("/:id", getPostById);

router.post("", addPost);

router.get("", getPost);

router.delete("/:id", deletePost);

router.patch("/:id", editPost);

module.exports = router;
