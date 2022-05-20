const express = require("express");
const router = express.Router();
const {
  addPost,
  getPost,
  deletePost,
  editPost,
  getPostById,
} = require("../controllers/post/posts.controller.js");
const imageUpload = require("../middlewares/imageUpload.js");

router.get("/:id", getPostById);

router.post("", imageUpload, addPost);

router.get("", getPost);

router.delete("/:id", deletePost);

router.patch("/:id",imageUpload, editPost);

module.exports = router;
