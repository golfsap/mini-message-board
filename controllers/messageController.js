const db = require("../db/queries");

exports.messagesListGet = async (req, res) => {
  try {
    const messages = await db.getAllMessages();
    console.log("Messages: ", messages);
    res.render("index", { title: "Mini MessageBoard", messages: messages });
  } catch (err) {
    console.log("Error retrieving messages: ", err);
    res.status(500).send("Server error");
  }
};
