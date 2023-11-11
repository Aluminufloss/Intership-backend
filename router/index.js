const Router = require("express").Router;
const router = new Router();

const { body } = require("express-validator");

const userController = require("../controller/user-controller");
const articleController = require("../controller/article-controller");
const categoryController = require("../controller/category-controller");

const authMiddleware = require("../middleware/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 32 }),
  userController.registration 
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

router.post("/articles", articleController.getArticles);
router.post("/articles/create", authMiddleware, articleController.create);
router.get("/articles/:id", articleController.getArticleById);

router.get("/categories", categoryController.getCategories);

module.exports = router;
