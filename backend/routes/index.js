const express = require('express');
const axios = require('axios');
const router = express.Router();
const { /* makeDocRef, */ getItemBy, setData, fetchFirestore, checkAuth } = require('../firebase')
const icecat = require('icecat')

const icecatClient = new icecat('mamparo923', 'hezfas-ripvor-8viqzU')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Welcome to Pantry Backend' });
});

router.get('/test', checkAuth, async (req, res, next) => {
  const { locals } = res

  res.status(200).json({
    payload: locals,
    message: 'This is the test route used for development',
    error: false,
  })
});

router.get('/firestore/:collection/doc/:reference', async (req, res, next) => {
  const { collection, reference } = req.params
  try {
    const data = await fetchFirestore(reference, collection)
    console.log(data)
    res.status(200).json({
      payload: data,
      message: `Successfully retrieved data from firestore ${collection}: ${reference}`,
      error: false,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      payload: null,
      message: "failed to connect to firestore",
      error: true,
    })
  }
})

router.get('/check/upc/:upc', async (req, res, next) => {
  const { upc } = req.params
  try {
/*
    let data = await icecatClient.openCatalog
      .getProduct('US', upc)
      .then(function(product) {
        console.log('PRODUCT: ', product.jsonData['ICECAT-interface'].Product)
        console.log('Description: ' + product.getLongDescription());
        const productImages = product.getImages();
        console.log('Product images:');
        for (let i in productImages) {
          console.log(productImages[i].ThumbImg);
        }
      })
      .catch(function(reason) {
        console.error('Error or timeout', reason);
      });
    console.log('icecat', data)
*/
    let data = await getItemBy(upc)
    console.log('/check/upc/', data)
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
})

router.post('/setdata/:collection/doc/:docref', async (req, res, next) => {
  const { collection, docref } = req.params
  const { payload } = req.body

  console.log(JSON.parse(payload))

  try {
    let data = await setData(collection, docref, {
      results: [{source: 'spoonacular', data: JSON.parse(payload)}],
      valid: true,
    })
    console.log(data)
    res.status(200).json({
      payload: data, 
      message: `Successfully set data at ref ${docref}`,
      error: false
    })
  } catch (error) {
    console.log('Error at /setdata/:collection/doc/:docref', error)
    res.status(500).json({
      payload: null,
      message: "There was an issue setting data at given collection and ref",
      error: true,
    })
  }
})

router.post('/', (req, res, next) => {
  console.log(Array(100).fill('@').join(''))
  console.log(req.headers)
  console.log(Array(100).fill('@').join(''))
  res.json({
    title: 'hello this is a post req',
    user: res.locals.user_id,
    data: req.body,
    
  })
})

module.exports = router;

// router.get('/testing/adding/upc/:upc', async (req, res, next) => {
//   try {
//     const { data } = await axios.get(`https://api.spoonacular.com/food/products/upc/${req.params.upc}?apiKey=${process.env.SPOONACULAR_API_KEY}`)
//     console.log(data)
//     let idk = await makeDocRef(req.params.upc, data)
//     console.log(idk)
//     res.json({
//       payload: data,
//       message: "successfully uploaded upc",
//       error: false,
//     });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       payload: null,
//       message: "you can't perform this action",
//       error: true,
//     });
//   }
// })

// router.get('/makedocref/id/:id/upc/:upc', async (req, res, next) => {
//   let { id, upc } = req.params
  
//   try {
//     let data = await makeDocRef(id, upc, {test: 'this is some test data not to be used'})
//     console.log(Array(5).fill('\n').join('') + 'This is data from make doc ref' + Array(5).fill('\n').join(''), data)
//     res.status(200).json({
//       payload: data,
//       message: 'successfully uploaded to firestore',
//       error: false,
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       payload: null,
//       message: 'There was an issue uploading data to firestore',
//       error: true,
//     })
//   }
// })