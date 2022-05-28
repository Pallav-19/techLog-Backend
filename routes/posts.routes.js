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
const checkAuth = require("../middlewares/check-auth.js");
router.get("/:id", getPostById);

router.post("", checkAuth, imageUpload, addPost);

router.get("", getPost);
router.delete("/:id", checkAuth, deletePost);

router.patch("/:id", checkAuth, imageUpload, editPost);

module.exports = router;
