const axios = require('axios');
const {admin, db} = require('../../firebase')

const fetchSpoonacular = async (idOrUPC, typeUPC = true) => {
  const { data } = await axios.get(`https://api.spoonacular.com/food/products/${typeUPC ? 'upc/' : ''}${idOrUPC}?apiKey=${process.env.SPOONACULAR_API_KEY}`)
  // console.log('fetchSpoonacular', data)
  if (data.status && data.status === 'failure') {
    return {
      result: null,
      source: 'spoonacular',
      valid: false,
    }
  }
  return {
    result: data,
    source: 'spoonacular',
    valid: true,
  }
}

const fetchFDC = async (reqBody, search = false) => {
  const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods${ search ? '/search' : '' }?api_key=`
  const apiKey = process.env.FDC_API_KEY
  const url = baseUrl + (apiKey ? apiKey : 'DEMO_KEY')
  const { data } = await axios.post(url, reqBody)
  // console.log('fetchFDC', data)
  if (data.totalHits === 0) {
    return {
      result: null,
      source: 'fdc',
      valid: false,
    }
  }
  return {
    result: data.foods.length === 1 ? data.foods[0] : data.foods,
    source: 'fdc',
    valid: true,
  }
}

const searchAPIs = async (upc) => {
  let results = await Promise.all([
    fetchFDC({query: upc}, true),
    fetchSpoonacular(upc),
  ])
  // console.log('SEARCH APIS RESULTS: ', results)
  return results
}


const fetchFirestore = async (collection, reference) => {
  try {
    let doc = await db
      .collection(collection)
      .doc(reference)
      .get()
    
    // console.log(doc)
    return doc.exists ? doc.data() : doc
  } catch (error) {
    console.log('fetchFirestore ERROR: ', error)
  }
}

const createFirestoreReference = async (collection, reference) => {
  try {
    let status = await db
      .collection(collection)
      .doc(reference)
      .set({
        results: [],
        item: {
          name: null,
          img: null,
        },
        valid: false,
      }, { merge: true })
    
    console.log('status of createFirestoreReference', status)
    return status
  } catch (error) {
    console.log('createFirestoreReference ERROR: ', error)
  }
}

const addResultToFirestoreUPCDoc = async (collection, UPCRef, resultData) => {
  let ref = db.collection(collection).doc(UPCRef)

  try {
    let status = await db.runTransaction(async doc => {
      try {
        let data = await doc.get(ref)
        
        if (data.exists) data = data.data().results
        else return null

        data = data.concat(resultData)
        doc.update(ref, { results: data })
      } catch (error) {
        console.log('runTransaction ERROR: ', error)
      }
    })
    
    console.log('status of addResultToFirestoreUPCDoc', status)
    return status
  } catch (error) {
    console.log('addResultToFirestoreUPCDoc ERROR: ', error)
  }
}

const createNewUPC = async (upc) => {
  let data = await searchAPIs(upc)
  console.log('createNewUPC DATA: ', data)
  let status1 = await createFirestoreReference('foodByUPC', upc)
  console.log('createNewUPC STATUS1: ', status1)
  let status2 = await addResultToFirestoreUPCDoc('foodByUPC', upc, data)
  console.log('createNewUPC STATUS2: ', status2)
  // let status3 = await addResultToFirestoreUPCDoc('foodByUPC', upc, data[1])
  // console.log('createNewUPC STATUS3: ', status3)
  return data
}


module.exports = {
  addResultToFirestoreUPCDoc,
  createNewUPC,
  createFirestoreReference,
  fetchFDC,
  fetchFirestore,
  fetchSpoonacular,
  searchAPIs,
}