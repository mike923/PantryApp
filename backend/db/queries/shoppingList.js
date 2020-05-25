const db = require("../db");

//retrieving shopping list
const getAllItems = async () =>
  await db.any(`SELECT * FROM shopping_list_items`);

//getting a shopping list by id
const getShoppingListById = async (id) =>
  await db.any("SELECT * FROM shopping_list_items WHERE pantry_id = $1", [id]);

// //adding a new item to the shopping list
const addNewItem = async (product, pantry_id, quantity) =>
  await db.one(
    `INSERT INTO shopping_list_items (product,pantry_id,quantity) VALUES($1,$2,$3) RETURNING *`,
    [product, pantry_id, quantity]
  );

// //retrieving users email id
// const getPantryByName = async (name) =>
//   await db.oneOrNone("SELECT * FROM pantry WHERE name = $1", [name]);

// //updating user info
// const updatePantryInfo = async (name, id) =>
//   await db.oneOrNone(
//     `
//   UPDATE pantry SET name = $1 WHERE id = $2 RETURNING  id, name`,
//     [name, id]
//   );

// // const hardDeleteUSer = async (id) => await db.none("DELETE * FROM users WHERE id = $1"[id]);

module.exports = {
  getAllItems,
  getShoppingListById,
  addNewItem,
};
