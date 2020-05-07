const db = require("../db");

//retrieving all users
const getAllPantries = async () => await db.any(`SELECT * FROM pantry`);

//getting a user by id
const getPantryById = async (id) => await db.oneOrNone("SELECT id FROM pantry WHERE id = $1", [id]);

//adding a new user to app
const addNewPantry = async (name) => await db.one(`INSERT INTO pantry (name) VALUES($1) RETURNING *`, [name]);;

//retrieving users email id
const getPantryByName = async (name) => await db.oneOrNone("SELECT * FROM pantry WHERE name = $1", [name]);

//updating user info
const updatePantryInfo = async (name, id) => await db.oneOrNone(`
  UPDATE pantry SET name = $1 WHERE id = $2 RETURNING  id, name`
, [name, id]);

// const hardDeleteUSer = async (id) => await db.none("DELETE * FROM users WHERE id = $1"[id]);

module.exports = {
  getAllPantries,
  getPantryById,
  addNewPantry,
  getPantryByName,
  updatePantryInfo,
};
