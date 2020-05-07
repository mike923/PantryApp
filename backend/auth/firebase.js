const admin = require("firebase-admin")
const axios = require('axios');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-pantry.firebaseio.com"
});

const db = admin.firestore();

// let docRef = db.collection('foodbyupc').doc('041631000564')

// const makeDocRef = (id, upc, data) => {
//   console.log('this is id', id, 'this is upc', upc)
//   if (!id) {
//     id = `00${data.id}`
//   }
//   if (!upc) {
//     upc = data.upc
//   }

//   console.log('AFTER SOME MODIFICATIONS IF ANY', 'this is id', id, 'this is upc', upc)

//   let upcRef = db.collection('foodbyupc').doc(upc)
//   let idRef = db.collection('foodbyupc').doc(id)

//   return {
//     upcRef: upcRef.set(data),
//     idRef: idRef.set(data),
//   }
// }

const setData = async (collection, ref, data) => {
  return await db.collection(collection).doc(ref).set(data)
}

const fetchSpoonacular = async (idOrUPC, typeUPC = true) => {
  const { data } = await axios.get(`https://api.spoonacular.com/food/products/${typeUPC ? 'upc/' : ''}${idOrUPC}?apiKey=${process.env.SPOONACULAR_API_KEY}`)
  console.log('fetchSpoonacular', data)
  if (data.status && data.status === 'failure') {
    return null
  }
  return data
}

const uploadToFirestore = async ({collection, reference, data, source}) => {
  console.log(collection, reference, data, source)
  let res
  try {
    res = await db
    .collection(collection)
    .doc(reference)
    .set({
      results: [{source: source, data: data}],
      valid: true,
    })
  } catch (error) {
    console.log(error)
    res = error
  }
  
  console.log(res)
  return res
} 

const getItemBy = async (idOrUPC, typeUPC = true) => {
  const collection = typeUPC ? 'foodByUPC' : 'foodByID'
  console.log(collection, idOrUPC)
  let docRef = db.collection(collection).doc(idOrUPC)

  let getDoc = await docRef
    .get()
    .then(async doc => {
      if (doc.exists) {
        console.log('found doc', doc.data())
        return doc.data()
      } else {
        console.log(idOrUPC, 'not found in the database')
        const data = await fetchSpoonacular(idOrUPC, typeUPC)
        if (data) {
          uploadToFirestore({
            collection: 'foodByUPC',
            reference: data.upc,
            data: data,
            source: 'spoonacular',
          })
          uploadToFirestore({
            collection: 'foodByID',
            reference: `00${data.id}`,
            data: data,
            source: 'spoonacular',
          })
        } 
        console.log('data retrieved from spoonacular in getby call', data)
        return data
      }
    })
    .catch(err => {
      console.log('err', err)
    })

  console.log('getdoc', getDoc)
  return getDoc
}

const fetchFirestore = async (collection, reference) => await db
  .collection(collection)
  .doc(reference)
  .get()
  .then(doc => doc.exists ? doc.data() : null)
  .catch(err => err)

// let testupc = docRef.set()

const checkAuth = (req, res, next) => {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then((eto) => {
        console.log(eto)
        res.locals.user_id = eto.uid
        res.locals.email = eto.email
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized!')
    return
  }
}

module.exports = {
  checkAuth,
  fetchFirestore,
  getItemBy,
  setData,
  // makeDocRef,
}