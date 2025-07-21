const { Router } = require("express");
const messageController = require("../controllers/messageController");
const { body, validationResult } = require("express-validator");
const indexRouter = Router();

indexRouter.get("/", messageController.messagesListGet);
indexRouter.get("/new", messageController.newMessageGet);
indexRouter.post(
  "/new",
  [
    body("messageUser").trim().notEmpty().withMessage("Name is required."),
    body("messageText").trim().notEmpty().withMessage("Message is required."),
  ],
  messageController.newMessagePost
);
indexRouter.get("/messages/:id", messageController.messageIdGet);
indexRouter.post("/delete/:id", messageController.deleteMessagePost);

module.exports = indexRouter;
