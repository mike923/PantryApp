const express = require("express");
const router = express.Router();
const tesseract = require('tesseract.js')

const readImgData = async (img, details) => {
  const start = Date.now();
  const test = await tesseract
    .recognize(img, "eng", {
      logger: (m) =>
        console.log(`Progress: `, Math.round(m.progress * 100), `%`),
    })
    .then(({ data: { text } }) => {
      console.log(`Finished`);
      console.log(`Time taken: `, `${(Date.now() - start) / 1000} seconds`);
      console.log(text)
      return text;
    });

    console.log(test)
    return test
};


/* Read Image and Parse it into Text */
router.post("/parse", async function (req, res, next) {
  console.log('hit endpoint', req.body)
  // const formData = req.data
  const parsedText = await readImgData(req.body.url)
  console.log(`Tesseract Parse route hit.`, parsedText)
  res.json({
    details: `Tesseract parsed image`,
    data: parsedText
  })
});

module.exports = router;


