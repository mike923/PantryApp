const db = require("../db");

//retrieving shopping list
const getAllItems = async () =>
  await db.any(`SELECT * FROM shopping_list_items`);

//getting a shopping list by id
const getShoppingListById = async (pantry_id) =>
  await db.any(
    "SELECT * FROM shopping_list_items WHERE (pantry_id = $1) AND completed = false ORDER BY shopping_list_items.id DESC",
    [pantry_id]
  );

// //adding a new item to the shopping list
const addNewItem = async (product, pantry_id, quantity) =>
  await db.one(
    `INSERT INTO shopping_list_items (product,pantry_id,quantity) 
     VALUES($1,$2,$3)
     ON CONFLICT (product) DO UPDATE SET completed = false, quantity = $3
     RETURNING *`,
    [product, pantry_id, quantity]
  );

const updateItem = async (itemObj, id) => {
  if (itemObj.product) {
    return await db.oneOrNone(
      `UPDATE shopping_list_items
      SET product = $1 
      WHERE id = $2
      RETURNING  *`,
      [itemObj.product, Number(id)]
    );
  } else if (itemObj.quantity) {
    return await db.oneOrNone(
      `UPDATE shopping_list_items
      SET quantity = $1
      WHERE id = $2
      RETURNING *`,
      [itemObj.quantity, Number(id)]
    );
  }
};

const removeItem = async (id) => {
  console.log("id", id);

  return await db.oneOrNone(
    `UPDATE shopping_list_items
      SET completed = true
      WHERE id = $1
      RETURNING  *`,
    [Number(id)]
  );
};

module.exports = {
  getAllItems,
  getShoppingListById,
  addNewItem,
  updateItem,
  removeItem,
};
