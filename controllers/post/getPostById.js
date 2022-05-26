const Post = require("../../models/post.js");

const getPostById = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((resultData) => {
      if (resultData) {
        res.json(resultData);
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: "Something went wrong",
        },
      });
    });
};
module.exports = getPostById;
