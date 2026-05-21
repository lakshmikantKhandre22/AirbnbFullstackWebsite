const express = require("express");

const router = express.Router();


// INDEX Route -> Get all posts
router.get("/", (req, res) => {
    res.send("This is POSTS INDEX route");
});


// SHOW Route -> Get one post by id
router.get("/:id", (req, res) => {
    res.send(`This is SHOW route for post id: ${req.params.id}`);
});


// CREATE Route -> Create new post
router.post("/", (req, res) => {
    res.send("New post created");
});


// UPDATE Route -> Update post by id
router.put("/:id", (req, res) => {
    res.send(`Post updated for id: ${req.params.id}`);
});


// DELETE Route -> Delete post by id
router.delete("/:id", (req, res) => {
    res.send(`Post deleted for id: ${req.params.id}`);
});


module.exports = router;