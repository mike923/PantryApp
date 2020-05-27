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

const uploadReceiptData = async (receipt) => 
  await db.oneOrNone(`
    INSERT INTO receipts (pantry_id, receipt_url, store_name, total, receipt_date)
    VALUES ($/pantry_id/, $/receipt_url/, $/store_name/, $/total/, $/receipt_date/)
  `, receipt);

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
  uploadReceiptData
};
