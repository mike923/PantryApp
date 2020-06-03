require("dotenv").config();
const {searchAPIs, uploadToFirestore, fetchFirestore, ...e } = require('./db/queries/allFoods')
const fi = require('./db/queries/foodItem')

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

// l(fetchFirestore, '038000402906', 'foodByUPC')
// l(e.createQuickItemLookup, 'foodByUPC', '044000032197')
// l(searchAPIs('044000032197'))
// l(e.createNewUPC, '044000058678')
// l(fi.getFoodItemByItemID, 1)

let qwerqwer = [
  "016000122536",
  "016000123151",
  "028400199636",
  "028400372183",
  "030000012000",
  "030000014998",
  "037600105064",

  "038000222634",
  "038000222832",
  "038000223167",
  "038000231537",
  "038000402906",
  "041789007019",

  "044000032197",
  "044000033279",
  "044000058678",
  "050000758395",
  "072030013534",
  "072030014821",
  "085239262009",

  "085239381816",
  "190646630089",
  "4007993016922",
  "430000018000",
  "6058800012000",
  "884912268396"
]

const reseedfirestore = async (qwer) => {
  for (upc of qwer) {
    console.log('starting fetch for upc: ', upc)

    // let data = await new Promise(resolve => setTimeout(resolve, 3000)).then(v => upc);
    // console.log('fetch should occur here')
    let data = await fetchFirestore(upc, 'newcollection')
    let promise = await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('fetch complete', Object.keys(data), promise);
  }
}

// l(fetchFirestore, qwerqwer[2], 'newcollection')
reseedfirestore(qwerqwer)
// l(e.fetchSpoonacular, '?asdfasdf')