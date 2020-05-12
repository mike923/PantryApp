const axios = require('axios');

const fetchSpoonacular = async (idOrUPC, typeUPC = true) => {
  const { data } = await axios.get(`https://api.spoonacular.com/food/products/${typeUPC ? 'upc/' : ''}${idOrUPC}?apiKey=${process.env.SPOONACULAR_API_KEY}`)
  console.log('fetchSpoonacular', data)
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
  console.log('fetchFDC', data)
  if (data.totalHits === 0) {
    return {
      result: null,
      source: 'fdc',
      valid: false,
    }
  }

  return {
    result: data.foods,
    source: 'fdc',
    valid: true,
  }

}

const searchAPIs = async (upc) => {
  let results = await Promise.all([
    fetchSpoonacular(upc),
    fetchFDC({query: upc}, true),
  ])
  console.log('SEARCH APIS RESULTS: ', results)
  return results
}

const createFirestoreReference = async (collection, reference) => {
  try {
    
  } catch (error) {
    console.log('createFirestoreReference ERROR: ', erroe)
  }
}


module.exports = {
  fetchFDC,
  fetchSpoonacular,
  searchAPIs,
}