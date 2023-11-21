const categoryService = require("../service/category-service");

class CategoryContoller {
  async getCategories(req, res, next) {
    try {
      const categories = await categoryService.getCategories();
      return res.json(categories);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CategoryContoller();
