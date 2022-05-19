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
      console.log(`error occured while fetching post by Id ${err}`);
    });
};
module.exports = getPostById;
