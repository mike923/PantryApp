const express = require("express");
const router = express.Router();
const queries = require("../db/queries/allFoods");

router.get("/checkByUPC/:upc", async (req, res, next) => {
  const { upc } = req.params

  try {
    let data = await queries.fetchFirestore('foodByUPC', upc)
    console.log('/check/upc/', data)
    if (typeof data === 'string') {
      // data = await queries.createNewUPC('foodByUPC', upc)
      // console.log("data = await queries.createNewUPC('foodByUPC', upc).simplifiedData", data)
      if (typeof data === 'string') throw new Error(`upc ${upc} not found`)
    }
    if (!data) throw new Error('Data retrieved from firestore returned null')
    res.status(200).json({
      payload: data, 
      message: `Successfully retrieved item with upc ${upc}`,
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      payload: null,
      message: "Sorry but we cannot find that upc",
      error: true,
    })
  }
});

router.get("/pantry", async (req, res, next) => {
  
})


module.exports = router;