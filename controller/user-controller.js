const ApiError = require("../exceptions/api-error");
const UserService = require("../service/user-service");
const { validationResult } = require("express-validator");

class UserContoller {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(ApiError.BadRequest("Ошибка при валидации", errors.array())); 

      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserContoller();