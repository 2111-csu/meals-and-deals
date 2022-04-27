const express = require("express");
const router = express.Router();
const { getUser, getAllUsers, getUserById, getUserByUsername, createUser } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await getUser();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
module.exports = router;