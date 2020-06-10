const db = require("../db");
const { createUpdateString } = require("./helpers");
const { fetchFirestore } = require("./allFoods");

const getFoodItemsByReceiptID = async (receiptId) =>
  await db.any(
    `
  SELECT * FROM food_item 
  JOIN receipts ON food_item.receipt_id = receipts.id
  WHERE receipt_id = 1;
`,
    [receiptId]
  );

const getFoodItemByItemID = async (itemId) => {
  let data = await db.oneOrNone(
    `
    SELECT * FROM food_item
    WHERE item_id = $1;
  `,
    [itemId]
  );

  if (data) {
    data.details = await fetchFirestore(data.upc).catch((error) =>
      console.log("food detail error: ", error.message)
    );
  }

  console.log("getFoodItemByID: ", data);
  return !data ? null : data;
};

const getFoodItemsByPantry = async (pantryId) =>
  await db.any(
    `
  SELECT * FROM food_item WHERE pantry_id = $1 ORDER BY item_id ASC
`,
    [pantryId]
  );

const addFoodItem = async (receiptData) =>
  await db.oneOrNone(
    `
  INSERT INTO food_item (receipt_id, pantry_id, preferred_name, price, quantity, upc, img_url) 
  VALUES ( $/receipt_id/, $/pantry_id/, $/preferred_name/, $/price/, $/quantity/, $/upc/, $/imgUrl/ ) 
  RETURNING *;
`,
    receiptData
  );

const updateFoodItem = async (id, data) => {
  delete data.receipt_date;
  delete data.edited;
  delete data.loaded;
  delete data.details;
  delete data.name;

  const [keys, str] = createUpdateString(data);

  const query = `
    UPDATE food_item
    SET ${str}
    WHERE item_id = ${id}
    RETURNING *;
  `;
  console.log(query);

  const updatedData = await db.one(query, {
    keys: keys,
    values: data,
  });
  console.log(updatedData);
  return updatedData;
};

module.exports = {
  getFoodItemsByReceiptID,
  addFoodItem,
  updateFoodItem,
  getFoodItemByItemID,
  getFoodItemsByPantry,
};
