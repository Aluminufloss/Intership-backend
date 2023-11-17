const articleService = require("../service/article-service");

class ArticleContoller {
  async getArticles(req, res, next) {
    try {
      const { category } = req.body;
      const articles = await articleService.getArticles(category);
      return res.json({articles});
    } catch (err) {
      next(err);
    }
  }

  async getArticleById(req, res, next) {
    try {
      const { id } = req.params;
      const article = await articleService.getArticleById(id);
      return res.json({ article });
    } catch(err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { heading, value, category } = req.body;
      const { id } = req.user;
      const newArticle = await articleService.create(id, heading, value, category);
      return res.json(newArticle);
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new ArticleContoller();
