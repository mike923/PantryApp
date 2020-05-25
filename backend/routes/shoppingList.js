const express = require("express");
const router = express.Router();
const queries = require("../db/queries/shoppingList");

router.post("/upload", async (req, res, next) => {
  const { product, pantry_id, quantity } = req.body;
  console.log(product, pantry_id, quantity);
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

router.get("/:id", async (req, res, next) => {
  try {
    const receipt = await queries.getShoppingListById(req.params.id);
    console.log("ri ri", receipt);

    res.json({
      payload: receipt,
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

module.exports = router;
