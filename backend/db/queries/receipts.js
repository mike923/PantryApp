const db = require("../db");

// upload the receipt image url from firebase into the database
const addImgUrl = async (pantry_id, receipt_json) =>
  await db.one(
    `
  INSERT INTO receipts (
    pantry_id,
    receipt_json
  )
  VALUES (
    $1,
    $2
  )
  RETURNING *
`,
    [pantry_id, receipt_json],
  );

const uploadReceiptData = async (receipt) => {
  let query = `
    INSERT INTO receipts
    VALUES ($1)

  `
  return await db.oneOrNone('', [receipt])
}

const getReceiptById = async (id) => {
  // try {
  return await db.oneOrNone("SELECT * from receipts WHERE id = $1", [id]);
  // } catch (err) {
  //   return
  // }
};

module.exports = {
  addImgUrl,
  getReceiptById,
};
