const axios = require("axios");
const { admin, db } = require("../../firebase");

const fetchSpoonacular = async (idOrUPC, typeUPC = true) => {
  const { data } = await axios.get(
    `https://api.spoonacular.com/food/products/${
      typeUPC ? "upc/" : ""
    }${idOrUPC}?apiKey=${process.env.SPOONACULAR_API_KEY}`
  );
  console.log("fetchSpoonacular", process.env.SPOONACULAR_API_KEY);
  if (data.status && data.status === "failure") {
    return {
      result: null,
      source: "spoonacular",
      valid: false,
    };
  }
  return {
    result: data,
    source: "spoonacular",
    valid: true,
  };
};

const fetchUPCitemDB = async (upc) => {
  const { data } = await axios.get(
    `https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`
  );
  console.log("fetchUPCitemDB", data);
  if (data.code === "INVALID_UPC" || data.total === 0) {
    return {
      result: null,
      source: "upcitemdb",
      valid: false,
    };
  }
  return {
    result: data.items[0],
    source: "upcitemdb",
    valid: true,
  };
};

const fetchFDC = async (reqBody, search = false) => {
  const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods${
    search ? "/search" : ""
  }?api_key=`;
  const apiKey = process.env.FDC_API_KEY;
  const url = baseUrl + (apiKey ? apiKey : "DEMO_KEY");
  const { data } = await axios.post(url, reqBody);
  // console.log('fetchFDC', data)
  if (!data.totalHits) {
    return {
      result: null,
      source: "fdc",
      valid: false,
    };
  }

  return {
    result: data.foods.length === 1 ? data.foods[0] : data.foods,
    source: "fdc",
    valid: true,
  };
};

const searchAPIs = async (upc) => {
  let results = await Promise.all([
    fetchSpoonacular(upc),
    fetchUPCitemDB(upc),
    fetchFDC({ query: upc }, true),
  ]);
  // console.log('SEARCH APIS RESULTS: ', results)
  return results;
};

const createFirestoreReference = async (collection, reference) => {
  try {
    let status = await db
      .collection(collection)
      .doc(reference)
      .set(
        {
          results: [],
          item: {
            name: null,
            img: null,
          },
          valid: false,
        },
        { merge: true }
      );

    console.log("status of createFirestoreReference", status);
    return status;
  } catch (error) {
    console.log("createFirestoreReference ERROR: ", error);
  }
};

const addResultToFirestoreUPCDoc = async (collection, UPCRef, resultData) => {
  let ref = db.collection(collection).doc(UPCRef);

  try {
    let status = await db.runTransaction(async (doc) => {
      try {
        let data = await doc.get(ref);
        console.log(Array(299).fill('+').join(), data.data(), Array(299).fill('+').join(), resultData, Array(299).fill('+').join())
        if (data.exists) data = data.data().results;
        else return null;

        data = data.concat(resultData);
        doc.update(ref, { results: data });
      } catch (error) {
        console.log("runTransaction ERROR: ", error);
      }
    });

    console.log("status of addResultToFirestoreUPCDoc", status);
    return status;
  } catch (error) {
    console.log("addResultToFirestoreUPCDoc ERROR: ", error);
  }
};

const fetchFirestore = async (collection, reference, item = true) => {
  try {
    let doc = await db.collection(collection).doc(reference).get();

    // console.log(doc)
    if (doc.exists) {
      doc = item ? doc.data().item : doc.data();
    } else {
      doc = await createNewUPC(reference);
      doc = item ? doc.simplifiedData : doc.data;
    }

    return doc;
  } catch (error) {
    console.log("fetchFirestore ERROR: ", error);
  }
};

const extractFDC = (data) => ({
  upc: data.gtinUpc,
  name: data.description,
  brand: data.brandOwner,
  nutrients: data.foodNutrients,
  ingredients: data.ingredients,
  fdc_data: data,
});

const extractSpoonacular = (data) => ({
  name: data.title,
  image: data.images[0],
  description: data.description,
  upc: data.upc,
  nutrition: data.nutrition,
  ingredients: data.ingredients,
  spoonacular_data: data,
});

const extractUPCitemDB = (data) => ({
  upc: data.ean,
  image: data.images[0],
  shopNow: data.offers[0],
  name: data.title,
  upcitemdb_data: data,
});

const extract = {
  fdc: extractFDC,
  upcitemdb: extractUPCitemDB,
  spoonacular: extractSpoonacular,
};

const consolidateResults = (results) => {
  let item = {};

  const inValid = results.every(({ valid }) => valid === false);
  if (inValid) return false;

  results
    .map(({ result, source, valid }) => (valid ? extract[source](result) : {}))
    .forEach((extract) =>
      Object.keys(extract).forEach(
        (property) => (item[property] = extract[property])
      )
    );
  return item;
};

const createQuickItemLookup = async (collection, reference) => {
  const ref = db.collection(collection).doc(reference);
  try {
    let status = await db.runTransaction(async (snap) => {
      try {
        let doc = await snap.get(ref);
        if (doc.exists) {
          // console.log('createQuickItemLookup', doc.data())
          const results = doc.data().results
          console.log(Array(299).fill('+').join(), results ,Array(299).fill('+').join())
          doc = consolidateResults(results);

          snap.update(ref, {
            item: doc ? doc : `Item not found: ${reference}`,
            results: results,
            valid: !!doc,
          });
        }
        return doc;
      } catch (error) {
        console.log(
          `There was an error fetching ${reference} from ${collection} collection in firestore: `,
          error
        );
      }
    });
    return status;
    // console.log(doc)
  } catch (error) {
    console.log("fetchFirestore ERROR: ", error);
  }
};

const createNewUPC = async (upc) => {
  let data = await searchAPIs(upc);
  // console.log('createNewUPC DATA: ', data)
  let status1 = await createFirestoreReference("foodByUPC", upc);
  // console.log('createNewUPC STATUS1: ', status1)
  let status2 = await addResultToFirestoreUPCDoc("foodByUPC", upc, data);
  // console.log('createNewUPC STATUS2: ', status2)
  let simplifiedData = await createQuickItemLookup("foodByUPC", upc);
  // console.log('createNewUPC STATUS3: ', status3)
  // let status3 = await addResultToFirestoreUPCDoc('foodByUPC', upc, data[1])
  // console.log('createNewUPC STATUS3: ', status3)
  return { data, simplifiedData };
};

module.exports = {
  addResultToFirestoreUPCDoc,
  consolidateResults,
  createNewUPC,
  createFirestoreReference,
  createQuickItemLookup,
  extract,
  fetchFDC,
  fetchFirestore,
  fetchSpoonacular,
  fetchUPCitemDB,
  searchAPIs,
};
