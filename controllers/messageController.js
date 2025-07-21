const db = require("../db/queries");
const { validationResult } = require("express-validator");

exports.messagesListGet = async (req, res) => {
  try {
    const messages = await db.getAllMessages();
    // console.log("Messages: ", messages);
    res.render("index", { title: "Mini MessageBoard", messages: messages });
  } catch (err) {
    console.log("Error retrieving messages: ", err);
    res.status(500).send("Server error");
  }
};

exports.newMessageGet = (req, res) => {
  res.render("form", { title: "Create Message " });
};

exports.newMessagePost = async (req, res) => {
  const errors = validationResult(req);

  const { messageUser, messageText } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      title: "Create Message",
      errors: errors.array(),
      messageUser,
      messageText,
    });
  }

  try {
    await db.addMessage(messageUser, messageText);
    res.redirect("/");
    return;
  } catch (err) {
    console.log("Error adding message: ", err);
    res.status(500).send("Server error");
  }
};

exports.messageIdGet = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await db.getMessage(id);
    if (!message) {
      return res.status(404).send("Message not found");
    }
    res.render("message", { title: "Message Details", message });
  } catch (err) {
    console.log("Error getting message: ", err);
    res.status(500).send("Server error");
  }
};

exports.deleteMessagePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.deleteMessage(id);
    if (deleted === 0) {
      return res.status(404).send("Message not found");
    }
    res.redirect("/");
    return;
  } catch (err) {
    console.error("Delete error: ", err);
    res.status(500).send("Server error");
  }
};
