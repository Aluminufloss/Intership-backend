const User = require('./models/User')
const Role = require('./models/Role')
const Article = require('./models/Article')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("./config");
const Category = require('./models/Category');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            console.log(req.body)
            const user = await User.findOne({username})
            if (!user) {
                return res.status(404).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(401).json({message: `Введен неверный пароль`})
            }

            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async createArticle(req, res) {
        try {
            const { heading, value, category } = req.body;
            const { id } = req.user;

            const article = new Article({ id, heading, value, category });
            await article.save();

            res.json('Статья успешно создана');
        } catch (e) {
            console.log(e);
        }
    }

    async getArticles(req, res) {
        try {
            const articles = await Article.find();
            res.json(articles);
        } catch (e) {
            console.log(e);
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (e) {
            console.log(e);
        }
    }
    // async cat(req, res) {
    //     try {
    //         const { label, value } = req.body;
    //         const category = new Category({ label, value });
    //         await category.save();
    //         res.json('yep')
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

module.exports = new authController()
