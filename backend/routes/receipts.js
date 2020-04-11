const express = require("express");
const router = express.Router();
const queries = require("../db/queries/receipts");
const { readImgData } = require("./tesseract");

router.post("/upload", async (req, res, next) => {
  const {url} = req.body
  console.log("You've his /parse", url)
  try {
    const {receipt_img_url} = await queries.addImgUrl(1, url);
    console.log(receipt_img_url)
    readImgData(receipt_img_url)
    res.json({
      payload: receipt_img_url,
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
  // try {
  //   let byId = await queries.getUsersById(req.params.id);

  //   res.json({
  //     payload: byId,
  //     message: "user information retrieved",
  //     error: false,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({
  //     payload: null,
  //     message: "you can't perform this action",
  //     error: true,
  //   });
  // }
});

module.exports = router;
