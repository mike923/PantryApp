const db = require("../db");

//retrieving all users
const getAllUsers = async () => await db.any(`SELECT id, email FROM users`);

//getting a user by id
const getUsersById = async (id) => {
  return await db.oneOrNone("SELECT id,email from users WHERE id = $1", [id]);
};

//adding a new user to app
const addNewUser = async (userObj) => {
  const newUserQStr = `INSERT INTO users (email,password_digest,id) 
VALUES($/email/,$/password_digest/,$/id/) RETURNING id,email`;

  return await db.one(newUserQStr, {
    email: userObj.email,
    password_digest: userObj.password,
    id: userObj.user_id,
  });
};

//retrieving users email id
const getUserByEmail = async (email) => {
  return await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
};

//updating user info
const updateUserInfo = async (userObj, id) => {
  return await db.oneOrNone(
    `UPDATE users 
    SET email = $1 
    WHERE id = $2
    RETURNING  id,email`,
    [userObj.username, Number(id)]
  );
};

module.exports = {
  getAllUsers,
  getUsersById,
  addNewUser,
  getUserByEmail,
  updateUserInfo,
};
