const Post = require("../../models/post.js");
const editPost = (req, res) => {
  let imagepath = req.body.image;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagepath = url + "/images/" + req.file.filename;
  }

  const id = req.params.id;
  Post.findOneAndUpdate(
    { _id: id, author: req.userData.userId },
    { title: req.body.title, content: req.body.content, image: imagepath }
  )
    .then((responseData) => {
      if (!(responseData.nModified > 0))
        {res.status(200).json({ message: "post updated successfully" });}
      else{  res.status(401).json({error: {message: "post update unsuccessfull, please edit"} });} 
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: "Could not edit post , Something seems to be wrong!",
        },
      });
    });
};
module.exports = editPost;
