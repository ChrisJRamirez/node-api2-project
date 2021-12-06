// implement your posts router here
const Post = require("./posts-model");
const express = require("express");
const router = express.Router();

//POSTS Endpoints
// 1 [GET] /api/posts
router.get("/", (req, res) => {
  Post.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    // .catch(error);
    // console.log(error);
    // res.status(500).json({
    //   message: "The posts information could not be retrieved"
    // })
});


// 2 [GET] /api/posts/:id
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist"})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json9({
        message: "The post information could not be retrieved"
      })
    })
});

// 3 [POST] /api/posts
router.post("/", (req, res) => {
  const newPost = req.body;
  if(!newPost.title || !newPost.contents) {
    res.status(400).json({message: "Please provide title and contents for the post"})
  } else {
    Post.insert(newPost)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(err => {
        res.status(500).json({message: "There was an error while saving the post to the database"})
      })
  }
});

// 4 [PUT] /api/posts/:id
router.put("/:id", async (req, res) => {
  const changes = req.body;
  const {id} = req.params;

  try{
    if(!changes.title || !changes.contents){
      res.status(400).json({message: "Please provide title and contents for the post"})
    } else {
      const updatedPost = await Post.update(id, changes)
      if(!updatedPost){
        res.status(404).json({message: "The post with the specified ID does not exist"})
      }else {
        res.status(200).json(updatedPost)
      }
    }
  } catch(err){
    res.status(500).json({message: "The post information could not be modified"})
  }


})

module.exports = router;