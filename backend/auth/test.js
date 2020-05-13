require("dotenv").config();
const {searchAPIs, uploadToFirestore, fetchFirestore, ...e } = require('../db/queries/allFoods')

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

const l = async(input) => {
  let data = await input
  console.log(data)
}

l(fetchFirestore('foodByUPC', '044000032197'))
l(searchAPIs('044000032197'))
l(e.createNewUPC('044000032197'))