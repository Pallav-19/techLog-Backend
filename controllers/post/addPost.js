const Post = require("../../models/post.js");
const User = require("../../models/user.js");

const addPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: url + "/images/" + req.file.filename,
    author: req.userData.userId,
    authorName: req.userData.username,
  });
  post
    .save()
    .then((post) => {
      User.findOneAndUpdate({ _id: post.author }, { $push: { posts: post } })
        .then(() => {
          console.log("post updated successfully in user ID " + post.author);
        })
        .catch((err) => {
          res.status(500).json({
            error: {
              message: "Could not add post!!!",
            },
          });
        });
      res.status(201).json({
        message: `The Post ${post} was saved`,
        resultId: post._id,
        createdPost: {
          id: post._id,
          title: post.title,
          content: post.title,
          image: post.image,
          author: post.author,
          authorName: post.authorName,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: "Could not add post!!!",
        },
      });
    });
};
module.exports = addPost;
