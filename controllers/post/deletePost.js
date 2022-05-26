const Post = require("../../models/post.js");

const deletePost = (req, res) => {
  const deleteId = req.params.id;
  Post.deleteOne({ _id: deleteId, author: req.userData.userId })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: `Post Deleted with ID ${deleteId}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: "Something went wrong, could not delete the post",
        },
      });
    });
};
module.exports = deletePost;
