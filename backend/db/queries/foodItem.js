const db = require("../db");

const getFoodItemByReceiptID = async (recieptId) => {
  const query = `SELECT * FROM food_item WHERE receipt_id = $1`;
  const data = await db.any(query, [recieptId]);
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

module.exports = {
  getFoodItemByReceiptID,
  addFoodItem,
};
