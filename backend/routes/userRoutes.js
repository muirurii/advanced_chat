const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/new", userControllers.registerUser);
router.post("/signin", userControllers.logIn);
router.get("/refresh", userControllers.getUser);

// Protected Routes

router.use(verifyJWT);

router.get("/friends", userControllers.getFriends);
router.post("/friends/add", userControllers.addFriend);
router.get("/all", userControllers.getUsers);

module.exports = router;