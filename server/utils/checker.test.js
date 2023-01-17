const Checker = require("./checker");

describe("Проверка всего модуля Checker для сервера", () => {
    describe("Проверка телефона", () => {
        test("Корректное значение", () => {
            expect(Checker.checkPhone('333727438')).toBe(true);
            expect(Checker.checkPhone('293727438')).toBe(true);
        })
        test("Некорректное значение", () => {
            expect(Checker.checkPhone('+375333727438')).toBe(false);
            expect(Checker.checkPhone('375333727438')).toBe(false);
            expect(Checker.checkPhone('343727438')).toBe(false);
            expect(Checker.checkPhone('3337274388')).toBe(false);
            expect(Checker.checkPhone('3727438')).toBe(false);
        })
    })

    describe("Проверка имени", () => {
        test("Корректное значение", () => {
            expect(Checker.checkName('Михаил')).toBe(true);
            expect(Checker.checkName('Michael')).toBe(true);
            expect(Checker.checkName('MISHA')).toBe(true);
        })
        test("Корректное значение граничное", () => {
            expect(Checker.checkName('Я')).toBe(true);
            expect(Checker.checkName('Абдурахмангаджи')).toBe(true);
        })
        test("Некорректное значение", () => {
            expect(Checker.checkName('')).toBe(false);
            expect(Checker.checkName('СлишкомДлинноеИмя')).toBe(false);
            expect(Checker.checkName('Михаил Иванов')).toBe(false);
            expect(Checker.checkName('Михаил3000')).toBe(false);
            expect(Checker.checkName('Михаил?')).toBe(false);
        })
    })

    describe("Проверка скидки", () => {
        test("Корректное значение", () => {
            expect(Checker.checkDiscount('50')).toBe(true);
            expect(Checker.checkDiscount('')).toBe(true);
        })
        test("Корректное значение граничное", () => {
            expect(Checker.checkDiscount('0')).toBe(true);
            expect(Checker.checkDiscount('100')).toBe(true);
        })
        test("Некорректное значение", () => {
            expect(Checker.checkDiscount('50%')).toBe(false);
            expect(Checker.checkDiscount('2.5')).toBe(false);
            expect(Checker.checkDiscount('105')).toBe(false);
            expect(Checker.checkDiscount('-2')).toBe(false);
        })
    })

    describe("Проверка количества меток", () => {
        test("Корректное значение", () => {
            expect(Checker.checkSessionsNumber('20')).toBe(true);
            expect(Checker.checkSessionsNumber('500000')).toBe(true);
            expect(Checker.checkSessionsNumber('')).toBe(true);
        })
        test("Корректное значение граничное", () => {
            expect(Checker.checkSessionsNumber('1')).toBe(true);
        })
        test("Некорректное значение", () => {
            expect(Checker.checkSessionsNumber('-2')).toBe(false);
            expect(Checker.checkSessionsNumber('2,5')).toBe(false);
            expect(Checker.checkSessionsNumber('Восемнадцать')).toBe(false);
        })
    })

    describe("Проверка роли", () => {
        test("Роль указана верно", () => {
            expect(Checker.checkRole('ADMIN')).toBe("ADMIN");
            expect(Checker.checkRole('USER')).toBe("USER");
        })
        test("Роль указана неверно", () => {
            expect(Checker.checkRole('ADMINISTRATOR')).toBe("USER");
            expect(Checker.checkRole('пользователь')).toBe("USER");
            expect(Checker.checkRole('')).toBe("USER");
        })
    })
})