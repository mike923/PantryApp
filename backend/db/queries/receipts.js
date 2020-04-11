const db = require("../db");

// upload the receipt image url from firebase into the database
const addImgUrl = async (pantry_id, url) => await db.one(`
  INSERT INTO receipts (
    pantry_id,
    receipt_img_url
  )
  VALUES (
    $1,
    $2
  )
  RETURNING *
`, [pantry_id, url]);

const getReceiptById = async (id) => await db.oneOrNone("SELECT * from receipts WHERE id = $1", [id]);

module.exports = {
  addImgUrl,
  getReceiptById,
};
