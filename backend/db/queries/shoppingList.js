const db = require("../db");

//retrieving shopping list
const getAllItems = async () =>
  await db.any(`SELECT * FROM shopping_list_items`);

//getting a shopping list by id
const getShoppingListById = async (pantry_id) =>
  await db.any(
    `SELECT * FROM shopping_list_items 
    WHERE (pantry_id = $1) AND completed = false 
    ORDER BY time_modified DESC`,
    [pantry_id]
  );

//adding a new item to the shopping list
const addNewItem = async (product, pantry_id, quantity) => {
  return await db.one(
    `INSERT INTO shopping_list_items (product,pantry_id,quantity,edited) 
       VALUES($1,$2,$3,$4)
       ON CONFLICT (product) DO UPDATE SET completed = false, edited = true, quantity = $3
       RETURNING *`,
    [product, pantry_id, quantity, "false"]
  );
};

const updateItem = async (itemObj, id) => {
  if (itemObj.product) {
    return await db.oneOrNone(
      `UPDATE shopping_list_items
      SET product = $1,
      edited = $2
      WHERE id = $3
      RETURNING  *`,
      [itemObj.product, "true", Number(id)]
    );
  } else if (itemObj.quantity) {
    return await db.oneOrNone(
      `UPDATE shopping_list_items
      SET quantity = $1,
      edited = $2
      WHERE id = $3
      RETURNING *`,
      [itemObj.quantity, "true", Number(id)]
    );
  }
};

const removeItem = async (id) => {
  console.log("id hit", id);

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
