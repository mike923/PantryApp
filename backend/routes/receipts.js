const express = require("express");
const router = express.Router();
const queries = require("../db/queries/receipts");

router.post("/upload", async (req, res, next) => {
  const { receipt } = req.body;
  receipt.pantry_id = res.locals.pantry_id;
  console.log(receipt);
  // console.log("You've hit /parse", url);
  try {
    const data = await queries.uploadReceiptData(receipt);
    console.log(data);
    // readImgData(receipt_img_url);
    res.json({
      payload: receipt,
      message: "successfully uploaded image",
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
    const receipt = await queries.getReceiptById(req.params.id);
    res.json({
      payload: receipt,
      message: "Receipt informaiton retrieved",
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
