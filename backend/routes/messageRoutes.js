const router = require("express").Router();
const messageControllers = require("../controllers/messageControllers");

router.get("/:username", messageControllers.getMessages);

module.exports = router;