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

async function addMessage(username, content) {
  await pool.query("INSERT INTO messages (text, username) VALUES ($1, $2)", [
    content,
    username,
  ]);
}

async function getMessage(id) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM messages WHERE id = ($1)",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function deleteMessage(id) {
  const result = await pool.query("DELETE FROM messages WHERE id = ($1)", [id]);
  return result.rowCount;
}

module.exports = {
  getAllMessages,
  addMessage,
  getMessage,
  deleteMessage,
};
