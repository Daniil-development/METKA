import Checker from "./checker";

describe("Проверка всего модуля Checker", () => {
    describe("Проверка телефона", () => {
        test("Корректное значение", () => {
            expect(Checker.checkPhone('+375333727438')).toEqual([true, '333727438']);
            expect(Checker.checkPhone('+375 (33) 372-74-38')).toEqual([true, '333727438']);
            expect(Checker.checkPhone('375333727438')).toEqual([true, '333727438']);
            expect(Checker.checkPhone('80333727438')).toEqual([true, '333727438']);
            expect(Checker.checkPhone('80 (33) 372-74-38')).toEqual([true, '333727438']);
        })
        test("Некорректное значение", () => {
            expect(Checker.checkPhone('333727438')[0]).toBe(false);
            expect(Checker.checkPhone('+385333727438')[0]).toBe(false);
            expect(Checker.checkPhone('+375803727438')[0]).toBe(false);
            expect(Checker.checkPhone('+37533372743')[0]).toBe(false);
            expect(Checker.checkPhone('+375333727_38')[0]).toBe(false);
            expect(Checker.checkPhone('+3753337274388')[0]).toBe(false);
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
            expect(Checker.checkName('')).toBe("Введите имя");
            expect(Checker.checkName('СлишкомДлинноеИмя')).toBe("Слишком длинное имя");
            expect(Checker.checkName('Михаил Иванов')).toBe("Неверное имя");
            expect(Checker.checkName('Михаил3000')).toBe("Неверное имя");
            expect(Checker.checkName('Михаил?')).toBe("Неверное имя");
        })
    })

    describe("Проверка скидки", () => {
        test("Корректное значение", () => {
            expect(Checker.checkDiscount('50')).toBe(true);
        })
        test("Корректное значение граничное", () => {
            expect(Checker.checkDiscount('0')).toBe(true);
            expect(Checker.checkDiscount('100')).toBe(true);
        })
        test("Некорректное значение", () => {
            expect(Checker.checkDiscount('')).toBe(false);
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
        })
        test("Корректное значение граничное", () => {
            expect(Checker.checkSessionsNumber('1')).toBe(true);
        })
        test("Некорректное значение", () => {
            expect(Checker.checkSessionsNumber('-2')).toBe(false);
            expect(Checker.checkSessionsNumber('')).toBe(false);
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