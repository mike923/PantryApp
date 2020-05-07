const express = require("express");
const router = express.Router();
const queries = require("../db/queries/users");
const pqueries = require("../db/queries/pantry");
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

router.post('/add', async (req, res, next) => {
  let { pantryId } = req.body

  try {
    if (req.body.newPantry) {
      const pantry = await pqueries.addNewPantry(req.body.pantryName)
      pantryId = pantry.id
    }
    console.log(pantryId)
    console.log(res.locals)
    const newUser = await queries.addNewUser({
      email: res.locals.email,
      id: res.locals.user_id,
      pantryId: Number(pantryId)
    })
    console.log(newUser)
    res.status(200).json({
      payload: newUser,
      message: "successfully added user",
      error: false,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      payload: null,
      message: "you can't perform this action",
      error: true,
    })
  }
})

module.exports = router;
