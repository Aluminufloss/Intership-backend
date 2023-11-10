const Router = require("express").Router;
const router = new Router();

const { body } = require("express-validator");

const userContoller = require("../controller/user-contoller");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 32 }),
  userContoller.registration 
);
router.post("/login", userContoller.login);
router.post("/logout", userContoller.logout);
router.get("/refresh", userContoller.refresh);

module.exports = router;
