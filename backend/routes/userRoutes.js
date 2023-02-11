const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/new", userControllers.registerUser);
router.post("/signin", userControllers.logIn);
router.get("/refresh", userControllers.getUser);
router.get("/friends", verifyJWT, userControllers.getFriends);

module.exports = router;