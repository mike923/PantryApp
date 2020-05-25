const express = require("express");
const router = express.Router();
const queries = require("../db/queries/foodItem");

router.get("/receiptid/:receipt_id", async (req, res, next) => {
  try {
    const data = await queries.getFoodItemsByReceiptID(req.params.receipt_id);
    res.status(200).json({
      payload: data,
      message: `Retrieved receipt data`,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      payload: null,
      message: `Something went horribly wrong`,
      error: error,
    });
  }
});

router.get("/itemid/:item_id", async (req, res, next) => {
  try {
    const data = await queries.getFoodItemByItemID(req.params.item_id);
    res.status(200).json({
      payload: data,
      message: `Retrieved item data`,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      payload: null,
      message: `Something went horribly wrong`,
      error: error,
    });
  }
});

router.post("/add", async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await queries.addFoodItem(req.body);
    res.status(200).json({
      payload: data,
      message: `Successfully added food item`,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      payload: null,
      message: `Something went horribly wrong`,
      error: error,
    });
  }
});

router.patch("/update/:id", async (req, res, next) => {
  console.log(`Update Food item route hit with: `, req.params.id, req.body);
  try {
    const data = await queries.updateFoodItem(req.params.id, req.body);
    res.status(200).json({
      payload: data,
      message: `Successfully updated food item`,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      payload: null,
      message: `Something went horribly wrong`,
      error: error,
    });
  }
});

module.exports = router;
