require("dotenv").config();
const {searchAPIs, uploadToFirestore, fetchFirestore, ...e } = require('../db/queries/allFoods')
const fi = require('../db/queries/foodItem')

const a = async () => {
  let data = await searchAPIs('044000032197')
  console.log('data[1]', data[1])

  uploadToFirestore({
    collection: 'foodByUPC',
    reference: data[1].result[0].gtinUpc,
    data: data[1].result[0],
    source: data[1].source,
    valid: true
  })
}
// a()

const l = async(callback, ...args) => {
  console.log(args, callback)
  let data = await callback(...args)
  console.log(Array(99).fill('@').join(''), '\nTHIS IS FROM THE FUNCTION WE ARE CREATING!!!\n', data, '\n=====the end======')
}

// l(fetchFirestore, 'foodByUPC', '038000402906')
// l(e.createQuickItemLookup, 'foodByUPC', '044000032197')
// l(searchAPIs('044000032197'))
// l(e.createNewUPC, '044000058678')
l(fi.getFoodItemByItemID, 1)