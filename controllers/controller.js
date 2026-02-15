const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateMessage = [
    body('author-name').trim()
        .isAlpha().withMessage('Name must only contain letters.')
        .isLength({ min: 1, max: 30 }).withMessage('Name must be between 1 and 30 characters.'),
    body('message-text').trim()
        .isLength({ min: 1, max: 3000 }).withMessage('Message must be between 1 and 3000 characters.')
]

async function allMessages(req, res) {
    const messages = await db.getAllMessages()
    res.render("index", { title: "Mini Messageboard", messages: messages });
}

async function newMessageGet(req, res) {
    res.render("form");
}

const newMessagePost = [
    validateMessage,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("form", {
                title: "Create user",
                errors: errors.array(),
                inputsError: {
                    name: req.body['author-name'],
                    message: req.body['message-text']
                }
            });
        }
        let messageText = req.body["message-text"];
        let authorName = req.body["author-name"];
        db.insertMessage(authorName, messageText);
        res.redirect("/");
    }
]

async function seeMessage(req, res) {
    const message = await db.findMessage(req.params.messageID);
    if (message) {
        res.render("message", { message: message[0] });
    } else {
        res.status(404).send("404: Message not found");
    }
}

module.exports = {
    allMessages,
    newMessageGet,
    newMessagePost,
    seeMessage
}