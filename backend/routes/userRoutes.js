const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

router.post("/new", userControllers.registerUser);

module.exports = router;