const router = require("express").Router();
const userController = require("./controllers/userController");
const {
  Authentication,
  Authorization,
  adminAuth,
  SuperAuth
} = require("./auth");

// router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

module.exports = router;
