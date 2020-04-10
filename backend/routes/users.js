const express = require("express");
const router = express.Router();
const queries = require("../db/queries/users");
// const { loginRequired } = require("../auth/helpers");

router.get("/", async (req, res, next) => {
  try {
    let users = await queries.getAllUsers();

    res.json({
      payload: users,
      message: "all users retrieved",
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      payload: null,
      message: "you can't perform this action",
      error: true,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let byId = await queries.getUsersById(req.params.id);

    res.json({
      payload: byId,
      message: "user information retrieved",
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      payload: null,
      message: "you can't perform this action",
      error: true,
    });
  }
});

module.exports = router;
