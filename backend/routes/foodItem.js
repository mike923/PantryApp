const express = require("express");
const router = express.Router();
const queries = require("../db/queries/foodItem");

router.get("/receiptid/:receipt_id", async (req, res, next) => {
  try {
    const data = await queries.getFoodItemByReceiptID(req.params.receipt_id);
    res.status(200).json({
      payload: data,
      msg: `Retrieved receipt data`,
      error: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      payload: null,
      msg: `Something went horribly wrong`,
      error: err,
    });
  }
});

router.post("/add", async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await queries.addFoodItem(req.body)
    res
      .status(200)
      .json({
        payload: data,
        msg: `Successfully added food item`,
        error: false
      })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        payload: null,
        msg: `Something went horribly wrong`,
        error: err
      })
  }
});

module.exports = router;
