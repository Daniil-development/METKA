class Checker {
    static checkPhone(phone) {
        const wrongNumber = false;

        if (phone === null || phone.length !== 9) {
            return wrongNumber;
        }

        for (let i = 0; i < phone.length; i++) {
            if (!"0123456789".includes(phone[i])) {
                return wrongNumber;
            }
        }

        let codes = ["29", "33", "44", "25"];

        if (!codes.includes(phone.substring(0, 2))) {
            return wrongNumber;
        }

        return true;
    }

    static checkName(name) {
        const ALPHABET = "ZXCVBNMASDFGHJKLQWERTYUIOPzxcvbnmlkjhgfdsaqwertyuiopячсмитьбюэждлорпавыфйцукенгшщзхъёЯЧСМИТЬБЮЭЖДЛОРПАВЫФЙЦУКЕНГШЩЗХЪЁ";

        if (name === null || name.length > 15 || name.length === 0) {
            return false;
        }

        for (let i = 0; i < name.length; i++) {
            if (!ALPHABET.includes(name[i])) {
                return false;
            }
        }

        return true;
    }

    static checkDiscount(discount) {
        const SYMBOLS = "0123456789";

        for (let i = 0; i < discount.length; i++) {
            if (!SYMBOLS.includes(discount[i])) {
                return false;
            }
        }

        return discount <= 100;
    }

    static checkSessionsNumber(sessions_number) {
        const SYMBOLS = "0123456789";

        for (let i = 0; i < sessions_number.length; i++) {
            if (!SYMBOLS.includes(sessions_number[i])) {
                return false;
            }
        }
        return true;
    }

    static checkRole(role) {
        if (role !== "ADMIN") {
            role = "USER";
        }
        return role;
    }
}

module.exports = Checker;