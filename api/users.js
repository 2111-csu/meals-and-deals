const express = require("express");
const router = express.Router();
const { getUser, getUserById } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const user = await getUser();
    res.send(user);
    console.log("I AM", user);
  } catch (error) {
    next(error);
  }
});
router.get("/:userId", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await getUserById(id);
    if (user) {
      res.send(user);
    } else {
      next({
        name: "NotFound",
        message: `User found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
