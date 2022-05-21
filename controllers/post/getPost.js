const Post = require("../../models/post.js");

const getPost = (req, res, next) => {
  const pagesize = +req.query.pagesize;
  const curentpage = +req.query.page;
  const pageQuery = Post.find()
  if (curentpage && pagesize) {
    pageQuery.skip(pagesize * (curentpage-1)).limit(pagesize)
  }

  pageQuery.then((foundData) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: foundData,
    });
  });
};
module.exports = getPost;
