// implement your posts router here
const Post = require("./posts-model");
const express = require("express");
const router = express.Router();

//POSTS Endpoints
router.get("/", (req, res) => {
  Post.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error);
    res.status(500).json({
      message: "The posts information could not be retrieved"
    })
})


module.exports = router;