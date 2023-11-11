const categoryService = require("../service/category-service");

//Ошибка из бд
class CategoryContoller {
  async getCategories(req, res, next) {
    try {
      const categories = categoryService.getCategories();
      return res.json(categories);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CategoryContoller();
