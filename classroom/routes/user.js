const express = require("express");

const router = express.Router();


// INDEX Route -> Get all users
router.get("/", (req, res) => {
    res.send("This is USERS INDEX route");
});


// SHOW Route -> Get one user by id
router.get("/:id", (req, res) => {
    res.send(`This is SHOW route for user id: ${req.params.id}`);
});


// CREATE Route -> Create new user
router.post("/", (req, res) => {
    res.send("New user created");
});


// UPDATE Route -> Update user by id
router.put("/:id", (req, res) => {
    res.send(`User updated for id: ${req.params.id}`);
});


// DELETE Route -> Delete user by id
router.delete("/:id", (req, res) => {
    res.send(`User deleted for id: ${req.params.id}`);
});


module.exports = router;