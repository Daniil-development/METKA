const Checker = require('../utils/checker');
const {User} = require('../models/models');

const ApiError = require('../error/ApiError');

const jwt = require('jsonwebtoken');

function generateJWT (id, phone, name, role, discount, sessions_number) {
    return jwt.sign(
        {id, phone, name, role, discount, sessions_number},
        process.env.SECRET_KEY
    )
}

class IndexController {
    async registration(req, res, next) {
        try {
            const {name, phone} = req.body;

            let error = false;

            if (Checker.checkPhone(phone) !== true) {
                error = true;
            }

            if (Checker.checkName(name) !== true) {
                error = true;
            }

            if (error) {
                return next(ApiError.badRequest('Некорректное Имя или Телефон'));
            }

            const candidate = await User.findOne({where: {phone}});
            if (candidate && (candidate.confirmed !== false)) {
                return next(ApiError.badRequest('Аккаунт с таким телефоном уже существует'));
            } else if (candidate && (candidate.confirmed === false)) {
                await User.destroy({where: {id: candidate.id}});
            }

            await User.create({name: name, phone: phone, auth_key: "1111", auth_key_validity_period: new Date()});

            return res.json({phone});
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async checkCode(req, res, next) {
        try {
            const {phone, code} = req.body;

            if (!code || !phone)  {
                return next(ApiError.badRequest('Некорректный код'));
            }

            const candidate = await User.findOne({where: {phone}});
            if (!candidate) {
                return next(ApiError.badRequest('Аккаунт с таким телефоном не существует'));
            }
            if (new Date().getTime() - new Date(candidate.auth_key_validity_period).getTime() > 600000) {
                return next(ApiError.badRequest('Код не действителен'));
            }
            if (candidate.auth_key !== code) {
                return next(ApiError.badRequest('Неверный код'));
            }

            if (candidate.confirmed !== true) {
                await User.update({confirmed: true}, {where: {id: candidate.id}});
            }

            const token = generateJWT(candidate.id, phone, candidate.name, candidate.role, candidate.discount, candidate.sessions_number);

            return res.json({token});
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async login(req, res, next) {
        const {phone} = req.body;

        if (Checker.checkPhone(phone) !== true) {
            return next(ApiError.badRequest('Неверный телефон'));
        }

        const user = await User.findOne({where: {phone}});

        if (!user || user.confirmed === false) {
            return next(ApiError.internal('Пользователь не найден'));
        }

        await User.update({auth_key: "1111", auth_key_validity_period: new Date()}, {where: {id: user.id}});
        //const token = generateJWT(user.id, phone, user.name, user.role, user.discount, user.sessions_number);

        return res.json({phone});
    }

    async check(req, res, next) {
        try {
            const token = generateJWT(req.user.id, req.user.phone, req.user.name, req.user.role, req.user.discount, req.user.sessions_number);
            return res.json({token});
        } catch (e) {
            console.log(e.message);
        }
    }

    async findUsers(req, res, next) {
        try {
            const {name, phone, role} = req.body;

            let users;

            if (!name && !phone || name === '' && phone === '')  {
                if (role === 'ADMIN') {
                    users = await User.findAll({where: {role: "ADMIN"}});
                } else {
                    users = await User.findAll({where: {role: "USER"}});
                }
            } else if (!name) {
                if (role === 'ADMIN') {
                    users = await User.findAll({where: {role: "ADMIN", phone: phone}});
                } else {
                    users = await User.findAll({where: {role: "USER", phone: phone}});
                }
            } else if (!phone) {
                if (role === 'ADMIN') {
                    users = await User.findAll({where: {role: "ADMIN", name: name}});
                } else {
                    users = await User.findAll({where: {role: "USER", name: name}});
                }
            } else {
                if (role === 'ADMIN') {
                    users = await User.findAll({where: {role: "ADMIN", phone: phone, name: name}});
                } else {
                    users = await User.findAll({where: {role: "USER", phone: phone, name: name}});
                }
            }


            return res.json(users);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async updateUser(req, res, next) {
        try {
            let {id, discount, sessions_number, role} = req.body;

            let result = true;
            const SYMBOLS = "0123456789";

            if (discount === '') {
                discount = 0;
            }

            result = Checker.checkDiscount(discount);

            if (sessions_number === '') {
                sessions_number = 0;
            }

            result = Checker.checkSessionsNumber(sessions_number);

            role = Checker.checkRole(role);

            if (!result) {
                next(ApiError.badRequest("Неверные данные"));
                return;
            }

            await User.update({role: role, discount: discount, sessions_number: sessions_number}, {where: {id: id}});

            return res.json({id});
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteUser(req, res, next) {
        try {
            let {id} = req.body;

            await User.destroy({where: {id: id}});

            return res.json({id});
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new IndexController();