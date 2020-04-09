const express = require("express");
const router = express.Router();
const tesseract = require('tesseract.js')

const readImgData = (img, details) => {
  const state = Date.now();
  tesseract
    .recognize(img, "eng", {
      logger: (m) =>
        console.log(`Progress: `, Math.round(m.progress * 100), `%`),
    })
    .then(({ data: { text } }) => {
      console.log(`Finished`);
      console.log(`Time taken: `, `${(Date.now() - start) / 1000} seconds`);
      return text;
    });
};


/* Read Image and Parse it into Text */
router.get("/parse", function (req, res, next) {
  console.log(req.body)
  // const formData = req.data
  // const parsedText = readImgData()
  console.log(`Tesseract Parse route hit.`)
  res.json({
    details: `Tesseract parsed image`,
    data: `Working`
  })
});

module.exports = router;


