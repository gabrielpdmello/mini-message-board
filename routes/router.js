const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get('/', controller.allMessages);

router.get('/new', controller.newMessageGet);

router.post('/new', controller.newMessagePost);

router.get('/messages/:messageID', controller.seeMessage)

module.exports = router;