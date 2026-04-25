const pool = require("./pool");
const local = require("./local")

async function getAllMessages() {
  let rows;
  try {
    result = await pool.query("SELECT * FROM messages");
    rows = result.rows;
  } catch {
    rows = local;
  }
  return rows;
}

async function insertMessage(username, message) {
  try {
    await pool.query("INSERT INTO messages (username, message, added) VALUES ($1, $2, NOW())", [username, message]);
  } catch {
    local.push({
        id: local.length + 1,
        username: `${username}`,
        message: `${message}`,
        added: new Date()
    })
  }
}

async function findMessage(id) {
  let rows;
  try {
    result = await pool.query("SELECT * FROM messages WHERE id=$1", [id]);
    rows = result.rows;
  } catch {
    rows = [local.find(item => item.id == id)]

    // result from query returns an array if it finds something, else it returns undefined;
    // fallback must do the same.
    if (rows[0] == undefined) {
      rows = undefined;
    }
  }

  return rows;
}

module.exports = {
  getAllMessages,
  insertMessage,
  findMessage
};
