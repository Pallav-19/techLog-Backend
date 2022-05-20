const Post = require("../../models/post.js");
const editPost = (req, res) => {
  let imagepath = req.body.image;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagepath = url + "/images/" + req.file.filename;
  }

  const id = req.params.id;
  Post.findOneAndUpdate(
    { _id: id },
    { title: req.body.title, content: req.body.content ,image:imagepath}
  )
    .then((responseData) => {
      res.json({ message: "post updated successfully" });
      console.log(responseData);
    })
    .catch((err) => {
      console.log(`an error ${err} occured`);
    });
};
module.exports = editPost;
