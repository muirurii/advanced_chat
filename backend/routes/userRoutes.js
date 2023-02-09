const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

router.post("/new", userControllers.registerUser);
router.post("/signin", userControllers.logIn);

module.exports = router;