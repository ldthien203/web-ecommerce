const { Response } = require("../commons");

const AuthController = {
    login(req, res, next) {
        res.render("login", Response({ res, data: { layout: false } }))
    },
    registor(req, res, next) {
        res.render("register", Response({ res, data: { layout: false } }))
    }
}

module.exports = AuthController;