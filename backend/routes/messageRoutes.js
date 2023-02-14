const router = require("express").Router();
const messageControllers = require("../controllers/messageControllers");
const verifyToken = require("../middleware/verifyJWT");

router.get("/:username", verifyToken, messageControllers.getMessages);

module.exports = router;