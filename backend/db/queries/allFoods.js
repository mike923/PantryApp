const axios = require("axios");
const { admin, db } = require("../../firebase");

const log = (...args) => console.log("queries/allfoods: ", ...args);

const respond = (result, source, valid) => ({ result, source, valid });

const fetchSpoonacular = async (idOrUPC, typeUPC = true) => {
  log("fetchSpoonacular");

  let response;
  let data = await axios
    .get(
      `https://api.spoonacular.com/food/products/${
        typeUPC ? "upc/" : ""
      }${idOrUPC}?apiKey=${process.env.SPOONACULAR_API_KEY}`
    )
    .catch((error) => {
      log("ERR0R with spoonacular", Object.keys(error), {
        ...error.response,
        config: "",
        request: "",
        headers: "",
      });
      response = respond(
        error.response ? error.response.data : error,
        "spoonacular",
        null
      );
    });

  if (response) log(data);
  if (response) return response;
  else data = data.data;

  response =
    data.status && data.status === "failure"
      ? respond(null, "spoonacular", false)
      : respond(data, "spoonacular", true);

  return response;
};

const fetchUPCitemDB = async (upc) => {
  log("fetchtupcitemdb");

  let response;
  let data = await axios
    .get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`)
    .catch((error) => {
      log("ERR0R with upcitemdb", Object.keys(error), {
        ...error.response,
        config: "",
        request: "",
        headers: "",
      });
      response = respond(
        error.response ? error.response.data : error,
        "upcitemdb",
        null
      );
    });

  if (response) log(data);
  if (response) return response;
  else data = data.data;

  response =
    data.code === "INVALID_UPC" || data.total === 0
      ? respond(null, "upcitemdb", false)
      : respond(data.items[0], "upcitemdb", true);

  return response;
};

const fetchFDC = async (reqBody, search = false) => {
  log("fetchfdc");

  let response;
  const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods${
    search ? "/search" : ""
  }?api_key=`;
  const apiKey = process.env.FDC_API_KEY;
  const url = baseUrl + (apiKey ? apiKey : "DEMO_KEY");
  let data = await axios.post(url, reqBody).catch((error) => {
    log("ERR0R with fdc", Object.keys(error), {
      ...error.response,
      config: "",
      request: "",
      headers: "",
    });
    response = respond(
      error.response ? error.response.data : error,
      "fdc",
      null
    );
  });

  if (response) log(data);
  if (response) return response;
  else data = data.data;

  response = !data.totalHits
    ? respond(null, "fdc", false)
    : respond(
        data.foods.length === 1 ? data.foods[0] : data.foods,
        "fdc",
        true
      );

  return response;
};

// TODO explain the order
const searchAPIs = async (upc) => {
  let results = await Promise.all([
    fetchSpoonacular(upc),
    fetchUPCitemDB(upc),
    fetchFDC({ query: upc }, true),
  ]);

  log(
    "searchapis results",
    results.map((r) => r.source + r.valid)
  );

  return results;
};

const createFirestoreReference = async (collection, reference) => {
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
    )
    .catch((error) => log("createFirestoreReference ERROR: ", error.message));

  log("create ref complete");

  return status;
};

const addResultToFirestoreUPCDoc = async (collection, UPCRef, resultData) => {
  let ref = db.collection(collection).doc(UPCRef);

  let status = await db
    .runTransaction(async (doc) => {
      let data = await doc
        .get(ref)
        .catch((error) => log("runTransaction ERROR: ", error.message));

      // log('addResultToFirestoreUPCDoc', data.data(), resultData);

      if (data.exists) data = data.data().results;
      else return null;

      data = data.concat(resultData);
      doc.update(ref, { results: data });
    })
    .catch((error) => log("addResultToFirestoreUPCDoc ERROR: ", error.message));

  log("addResultToFirestoreUPCDoc complete");
  return status;
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
  image: data.images,
  description: data.description,
  upc: data.upc,
  nutrition: data.nutrition,
  ingredients: data.ingredients,
  spoonacular_data: data,
});

const extractUPCitemDB = (data) => ({
  upc: data.ean,
  image: data.images,
  shopNow: data.offers,
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

  const inValid = results.every(({ valid }) => valid === false || !valid);
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
  let status = await db
    .runTransaction(async (snap) => {
      let doc = await snap
        .get(ref)
        .catch((error) =>
          log(
            `firestore error fetching ${reference} from ${collection}: `,
            error.message
          )
        );

      if (doc.exists) {
        const results = doc.data().results;
        log(
          "create quick item lookup transaction: ",
          results.map((d) => ({ ...d, result: "" }))
        );
        doc = consolidateResults(results);

        snap.update(ref, {
          item: doc ? doc : `Item not found: ${reference}`,
          results: results,
          valid: !!doc,
        });
      }

      return doc;
    })
    .catch((error) => log("createQuickItemLookup ERROR: ", error.message));

  return status;
};

const createNewUPC = async (upc, collection = "foodByUPC") => {
  const sendError = (func, error) => log(func, error.message);
  let data = await searchAPIs(upc).catch((e) =>
    sendError("searchapis failed", e)
  );
  log("searchAPIs complete");

  let status1 = await createFirestoreReference(collection, upc).catch((e) =>
    sendError("createFirestoreReference failed", e)
  );
  log("createFirestoreReference complete");

  let status2 = await addResultToFirestoreUPCDoc(
    collection,
    upc,
    data
  ).catch((e) => sendError("addResultToFirestoreUPCDoc failed", e));
  log("addResultToFirestoreUPCDoc complete");

  let simplifiedData = await createQuickItemLookup(collection, upc).catch((e) =>
    sendError("createQuickItemLookup failed", e)
  );
  log("createQuickItemLookup complete");

  return { data, simplifiedData };
};

const fetchFirestore = async (
  reference,
  collection = "foodByUPC",
  item = true
) => {
  log("fetching firestore", reference, collection, item);
  let doc = await db
    .collection(collection)
    .doc(reference)
    .get()
    .catch((error) => log("fetchFirestore ERROR: ", error));

  // log(doc)
  if (doc.exists) {
    doc = item ? doc.data().item : doc.data();
  } else {
    doc = await createNewUPC(reference, collection).catch((error) =>
      log("fetchfirestore create new upc failed", error.message)
    );
    doc = item ? doc.simplifiedData : doc.data;
  }

  return doc;
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
