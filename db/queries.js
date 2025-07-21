const pool = require("./pool");

async function getAllMessages() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM messages ORDER BY added DESC"
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllMessages,
};
