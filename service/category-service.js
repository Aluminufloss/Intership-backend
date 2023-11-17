const Category = require("../models/Category");

class CategoryService {
  async getCategories() {
    const categories = await Category.find();
    return { categories };
  }
}

module.exports = new CategoryService();
