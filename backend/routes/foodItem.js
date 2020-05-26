const express = require("express");
const router = express.Router();
const queries = require("../db/queries/foodItem");

const sendError = (error, res) => {
  console.log('Food Item error', error);
  res.status(500).json({
    payload: null,
    message: error.message,
    error: true,
  });
};

router.get("/receiptid/:receipt_id", async (req, res, next) => {
  const data = await queries.getFoodItemsByReceiptID(req.params.receipt_id)
    .catch(error => sendError(error, res));
  res.status(200).json({
    payload: data,
    message: `Retrieved receipt data`,
    error: false,
  });
});

router.get("/itemid/:item_id", async (req, res, next) => {
  const data = await queries.getFoodItemByItemID(req.params.item_id)
    .catch(error => sendError(error, res));
  res.status(200).json({
    payload: data,
    message: `Retrieved item data`,
    error: false,
  });
});

router.post("/add", async (req, res, next) => {
  console.log(req.body);
  const { foodItem } = req.body;
  console.log(foodItem);
  foodItem.pantry_id = res.locals.pantry_id;
  const data = await queries.addFoodItem(foodItem)
    .catch(error => sendError(error, res));
  res.status(200).json({
    payload: data,
    message: `Successfully added food item`,
    error: false
  });
});

router.patch("/update/:id", async (req, res, next) => {
  console.log(`Update Food item route hit with: `, req.params.id, req.body);
  const data = await queries.updateFoodItem(req.params.id, req.body)
    .catch(error => sendError(error, res));
  res.status(200).json({
    payload: data,
    message: `Successfully updated food item`,
    error: false
  });
});

module.exports = router;
