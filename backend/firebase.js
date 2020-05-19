const admin = require("firebase-admin")
const { getPantryByUserId } = require('./db/queries/users')
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-pantry.firebaseio.com"
});

const db = admin.firestore();

const checkAuth = (req, res, next) => {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then(async (eto) => {
        console.log(eto)
        const { pantry_id } = await getPantryByUserId(eto.uid)
        console.log(pantry_id)
        res.locals.pantry_id = pantry_id
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
  admin,
  checkAuth,
  db,
}

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
/*
const setData = async (collection, ref, data) => {
  return await db.collection(collection).doc(ref).set(data)
}


const uploadToFirestore = async ({collection, reference, data, source, valid}) => {
  console.log(collection, reference, data, source)
  let res
  try {
    res = await db
    .collection(collection)
    .doc(reference)
    .set({
      results: [{source: source, data: data}],
      valid: valid,
    }, { merge: true, })
  } catch (error) {
    console.log(error)
    res = error
  }
  
  console.log(res)
  return res
} 



const checkExistance = async (doc) => {
  if (doc.exists) {
    return doc.data()
  } else {
    return await fetchFDC(upc)
  }
}

const getItemByUPC = async (upc) => {
  let item = db
    .collection('foodByUPC')
    .doc(upc)

  item = await item
    .get()
    .then(checkExistance)
    .catch(handleError)

  return item
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
        if (data.result) {
          uploadToFirestore({
            collection: 'foodByUPC',
            reference: data.result.upc,
            data: data.result,
            source: data.source,
          })
          uploadToFirestore({
            collection: 'foodByID',
            reference: data.source + data.result.id,
            data: data.result,
            source: data.source,
          })
        } else {
          data = await fetchFDC()
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




module.exports = {
  checkAuth,
  fetchFirestore,
  getItemBy,
  searchAPIs,
  setData,
  fetchFDC,
  uploadToFirestore,
  // makeDocRef,
}

*/