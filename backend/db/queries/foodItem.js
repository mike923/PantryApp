const db = require("../db");
const { fetchFirestore } = require("./allFoods");

const getFoodItemsByReceiptID = async (receiptId) => await db.any(`
  SELECT * FROM food_item 
  JOIN receipts ON food_item.receipt_id = receipts.id
  WHERE receipt_id = 1;
`, [receiptId]);

const getFoodItemByItemID = async (itemId) => {
  const data = await db.oneOrNone(`
    SELECT * FROM food_item
    WHERE item_id = $1;
  `, [itemId]);
  console.log(data);
  
  const foodDetail = await fetchFirestore(data.upc)
    .catch(error => {
      console.log('there was an error retrieving food detail: ', error.message);
    });
  console.log('getFoodItemByItemID food detailed: ', foodDetail);

  if (data) {
    data.details = foodDetail;
  }

  if (!data) return null;
  return data;
}

const getFoodItemsByPantry = async (pantryId) => {
  
}

const addFoodItem = async (receiptData) => await db.oneOrNone(`
  INSERT INTO food_item (receipt_id, pantry_id, preferred_name, price, quantity, upc, img_url) 
  VALUES ( $/receiptId/, $/pantry_id/, $/preferred_name/, $/price/, $/quantity/, $/upc/, $/imgUrl/ ) 
  RETURNING *;
`, receiptData);

const updateFoodItem = async (id, data) => {
  delete data.receipt_date
  delete data.edited
  delete data.loaded

  const keys = Object.keys(data);
  console.log(keys);
  let str = keys.map((key, i) => `${key} = $/values.${key}/`).join(', ');
  console.log(str);
  
  const query = `
    UPDATE food_item
    SET ${str}
    WHERE item_id = ${id}
    RETURNING *;
  `
  console.log(query)

  const updatedData = await db.one(query, {
    keys: keys, 
    values: data
  });
  console.log(updatedData);
  return updatedData;
}

module.exports = {
  getFoodItemsByReceiptID,
  addFoodItem,
  updateFoodItem,
  getFoodItemByItemID,
};
