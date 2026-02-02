const express = require("express");
const app = express();
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    id: 1
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id: 2
  }
];


app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  let messageText = req.body["message-text"];
  let authorName = req.body["author-name"];
  let id = messages.at(-1).id + 1;
  messages.push( {text: messageText, user: authorName, added: new Date(), id: id });
  res.redirect("/");
});

app.get("/messages/:messageID", (req, res) => {
  let message = messages.find(message => message.id == req.params.messageID);
  if (message) {
    res.render("message", {message: message});
  } else {
    res.status(404).send("404: Message not found");
  }

})

app.use((req, res, next) => {
  res.status(404).send("404: page not found");
});


const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`listening on port ${PORT}`);
});