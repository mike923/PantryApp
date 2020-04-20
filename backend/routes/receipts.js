const express = require("express");
const router = express.Router();
const queries = require("../db/queries/receipts");
const { readImgData } = require("./tesseract");

router.post("/upload", async (req, res, next) => {
  const receipt_json = req.body;
  // console.log("You've hit /parse", url);
  try {
    const data = await queries.addImgUrl(1, receipt_json);
    // console.log(receipt_json);
    // readImgData(receipt_img_url);
    res.json({
      payload: data,
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
