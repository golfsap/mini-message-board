const { Router } = require("express");
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
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

indexRouter.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  if (messageUser && messageText) {
    messages.push({ text: messageText, user: messageUser, added: new Date() });
  }
  res.redirect("/");
});

module.exports = indexRouter;
