const Post = require("../../models/post.js");

const addPost = (req, res, next) => {
  const url = req.protocol + '://'+req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: url+ "/images/" + req.file.filename
  });
  post
    .save()
    .then((post) => {
      console.log(`The Post ${post} was saved`);
      res.status(201).json({
        message: `The Post ${post} was saved`,
        resultId: post._id,
        createdPost:{
          id:post._id,
          title:post.title,
          content:post.title,
          image:post.image,
        }
      });
    })
    .catch((err) => {
      console.log(`An Error ${err} occured.`);
    });
};
module.exports = addPost;
