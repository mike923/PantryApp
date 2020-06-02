const db = require("../db");

//retrieving shopping list
const getAllItems = async () =>
  await db.any(`SELECT * FROM shopping_list_items`);

//getting a shopping list by id
const getShoppingListById = async (pantry_id) =>
  await db.any(
    `SELECT * FROM shopping_list_items 
    WHERE (pantry_id = $1) AND completed = false 
    ORDER BY time_posted DESC`,
    [pantry_id]
  );

//adding a new item to the shopping list
const addNewItem = async (product, pantry_id, quantity, time_posted) => {
  console.log("time:", time_posted);

  return await db.one(
    `INSERT INTO shopping_list_items (product,pantry_id,quantity,time_posted) 
       VALUES($1,$2,$3,$4)
       ON CONFLICT (product) DO UPDATE SET completed = false, quantity = $3
       RETURNING *`,
    [product, pantry_id, quantity, time_posted]
  );
};

const updateItem = async (itemObj, id) => {
  if (itemObj.product) {
    return await db.oneOrNone(
      `UPDATE shopping_list_items
      SET product = $1,
      time_posted = $2 
      WHERE id = $3
      RETURNING  *`,
      [itemObj.product, itemObj.time_posted, Number(id)]
    );
  } else if (itemObj.quantity) {
    return await db.oneOrNone(
      `UPDATE shopping_list_items
      SET quantity = $1,
      time_posted = $2 
      WHERE id = $2
      RETURNING *`,
      [itemObj.quantity, itemObj.time_posted, Number(id)]
    );
  }
};

const removeItem = async (id, time_posted) => {
  console.log("id hit", id);

  return await db.oneOrNone(
    `UPDATE shopping_list_items
      SET completed = true,
      time_posted = $1
      WHERE id = $2
      RETURNING  *`,
    [Number(time_posted), Number(id)]
  );
};

module.exports = {
  getAllItems,
  getShoppingListById,
  addNewItem,
  updateItem,
  removeItem,
};
