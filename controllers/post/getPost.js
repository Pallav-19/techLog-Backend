const Post = require("../../models/post.js");
const user = require("../../models/user.js");

const getPost = (req, res, next) => {
  const pagesize = +req.query.pagesize;
  const curentpage = +req.query.page;
  const pageQuery = Post.find();
  let fetchedpost;
  if (curentpage && pagesize) {
    pageQuery.skip(pagesize * (curentpage - 1)).limit(pagesize);
  }

  pageQuery
    .then((documents) => {
      fetchedpost = documents;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedpost,
        postCount: count,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: "Could not fetch posts!!!",
        },
      });
    });
};
module.exports = getPost;
