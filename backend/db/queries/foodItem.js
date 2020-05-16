const db = require("../db");

const getFoodItemByReceiptID = async (recieptId) => {
  const query = `
    SELECT * FROM food_item 
    JOIN receipts ON food_item.receipt_id = receipts.id
    WHERE receipt_id = 1
  ;`;
  const data = await db.any(query, [recieptId]);
  return data;
};

const getFoodItemByItemID = async (itemId) => {
  const query = `
    SELECT * FROM food_item
    WHERE item_id = $1
  ;`;
  const data = await db.any(query, [itemId]);
  return data;
};

const addFoodItem = async (receiptData) => {
  const { receiptId, pantryId, name, price, quantity, imgUrl } = receiptData;
  const values = [receiptId, pantryId, name, price, quantity, imgUrl];

  const query = `
    INSERT INTO food_item (receipt_id, pantry_id, name, price, quantity, img_url) VALUES
    ($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const data = await db.oneOrNone(query, values);
  return data;
};

const updateFoodItem = async (id, data) => {
  delete data.receipt_date
  delete data.edited
  delete data.loaded

  const keys = Object.keys(data);
  console.log(keys);
  let str = keys.map(key => `${key} = $/${key}/`).join(', ');
  console.log(str);
  
  const query = `
    UPDATE food_item
    SET ${str}
    WHERE item_id = ${id}
    RETURNING *
  `

  console.log(query)

  const updatedData = await db.one(query, data);
  console.log(updatedData);
  return updatedData;
}

module.exports = {
  getFoodItemByReceiptID,
  addFoodItem,
  updateFoodItem,
  getFoodItemByItemID,
};
