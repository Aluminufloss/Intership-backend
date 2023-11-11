const ApiError = require("../exceptions/api-error");
const Article = require("../models/Article");

class ArticleService {
    async getArticles(category) {
        if (category === "All") return await Article.find();
        else return await Article.find({ category: category });
    }

    async getArticleById(id){
        const article = await Article.findById(id);
        
        if (!article) {
            throw ApiError.BadRequest(`Не было обнаружено статьи с таким id ${id}`);
        }

        return article;
    }

    async create(id, heading, value, category) {
        const newArticle = new Article({ id, heading, value, category });
        
        if (!newArticle) {
            throw ApiError.BadRequest("Статья не была успешно создана");
        }

        await newArticle.save();
        
        return newArticle;
    }
}

module.exports = new ArticleService();