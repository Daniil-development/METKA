let app = require('../index');
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should();


chai.use(chaiHttp);

const regUser = {
    name: "TestUserReg",
    phone: "290000000"
}
const notRegUser = {
    name: "TestUserNotReg",
    phone: "330000000"
}

const regUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInBob25lIjoiMjkwMDAwMDAwIiwibmFtZSI6IlRlc3RVc2VyUmVnIiwicm9sZSI6IlVTRVIiLCJkaXNjb3VudCI6MCwic2Vzc2lvbnNfbnVtYmVyIjowLCJpYXQiOjE2NzA4MDU1OTV9.ht1dmw5Elu1QwPZJG_eFICBlhZvX4zNsZISubMMcCkQ";

describe("Проверка функционала сервера", () => {

    describe("Регистрация тесты", () => {
        it('Должен зарегистрироваться ', (done) => {
            chai.request(app)
                .post('/registration')
                .send(notRegUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('phone');
                    res.body.phone.should.eql(notRegUser.phone);
                    done();
                })
        });
        it('Не должен зарегистрироваться ', (done) => {
            chai.request(app)
                .post('/registration')
                .send(regUser)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('message');
                    res.body.message.should.eql('Аккаунт с таким телефоном уже существует');
                    done();
                })
        });
    })

    describe("Логин тесты", () => {
        it('Должен залогиниться ', (done) => {
            chai.request(app)
                .post('/login')
                .send(regUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('phone');
                    res.body.phone.should.eql(regUser.phone);
                    done();
                })
        });
        it('Не должен залогиниться ', (done) => {
            chai.request(app)
                .post('/login')
                .send(notRegUser)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('message');
                    res.body.message.should.eql('Пользователь не найден');
                    done();
                })
        });
    })

    describe("Проверка кода из СМС", () => {
        it('Должен войти', (done) => {
            chai.request(app)
                .post('/login')
                .send(regUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('phone');
                    res.body.phone.should.eql(regUser.phone);
                    chai.request(app)
                        .post('/check_code')
                        .send({
                            phone: regUser.phone,
                            code: '1111'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('token');
                            res.body.token.should.not.be.null;
                        })
                    done();
                })
        });
    })

    describe("Проверка авторизации при загрузке", () => {
        it('Должен авторизироваться', (done) => {
            chai.request(app)
                .get('/auth')
                .set("authorization", "Bearer " + regUserToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    res.body.token.should.not.be.null;

                    done();
                })
        });

        it('Не должен авторизироваться', (done) => {
            chai.request(app)
                .get('/auth')
                .set("authorization", "Bearer " + 'NotToken')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message');
                    res.body.message.should.eql('Не авторизован');

                    done();
                })
        });
    })

    describe("Поиск пользователей", () => {
        it('Должен найти всех пользователей', (done) => {
            chai.request(app)
                .post('/admin/users/find')
                .send({
                    name: "",
                    phone: "",
                    role: ""
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.greaterThanOrEqual(2);

                    done();
                })
        });

        it('Должен найти по имени', (done) => {
            chai.request(app)
                .post('/admin/users/find')
                .send({
                    name: regUser.name,
                    phone: "",
                    role: ""
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.greaterThanOrEqual(1);
                    (res.body)[0].should.have.property('name').eql(regUser.name);

                    done();
                })
        });

        it('Должен найти по номеру', (done) => {
            chai.request(app)
                .post('/admin/users/find')
                .send({
                    name: "",
                    phone: regUser.phone,
                    role: ""
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    (res.body)[0].should.have.property('phone').eql(regUser.phone);

                    done();
                })
        });

        it('Не должен найти', (done) => {
            chai.request(app)
                .post('/admin/users/find')
                .send({
                    name: "",
                    phone: "0",
                    role: ""
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);

                    done();
                })
        });
    })
})