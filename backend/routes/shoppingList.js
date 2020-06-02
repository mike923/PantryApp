const express = require("express");
const router = express.Router();
const queries = require("../db/queries/shoppingList");

router.post("/upload", async (req, res, next) => {
  const { product, quantity } = req.body;
  const { pantry_id } = res.locals;
  try {
    const data = await queries.addNewItem(product, pantry_id, quantity);

    res.json({
      payload: data,
      message: "Product upload was successful",
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      payload: null,
      message: "You can't perform this action",
      error: true,
    });
  }
});

router.get("/", async (req, res, next) => {
  const { pantry_id } = res.locals;
  try {
    const shoppingList = await queries.getShoppingListById(pantry_id);
    console.log("ri ri", shoppingList);

    res.json({
      payload: shoppingList,
      message: "Shopping list items retrieved",
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

router.patch("/update/:id", async (req, res, next) => {
  try {
    let updatedItem = await queries.updateItem(req.body, req.params.id);
    res.json({
      payload: updatedItem,
      message: "Update successful",
      error: false,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      payload: null,
      msg: "Failed to update item",
      error: true,
    });
  }
});

router.patch("/completed/:id", async (req, res, next) => {
  try {
    let completedItem = await queries.removeItem(req.params.id);
    res.json({
      payload: completedItem,
      message: "item successful removed from list",
      error: false,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      payload: null,
      msg: "Failed, you can perform this action",
      error: true,
    });
  }
});

module.exports = router;
