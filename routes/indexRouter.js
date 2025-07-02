const { Router } = require("express");
const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini MessageBoard", messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((message) => message.id === messageId);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { title: "Message Details", message });
});

indexRouter.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  if (messageUser && messageText) {
    const newId =
      messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;
    messages.push({
      id: newId,
      text: messageText,
      user: messageUser,
      added: new Date(),
    });
  }
  res.redirect("/");
});

module.exports = indexRouter;
