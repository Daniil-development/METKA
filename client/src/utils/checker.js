export default class Checker {
    static checkPhone(phone) {
        const wrongNumber = [false, "Неверный телефон"];

        if (phone === null || phone === '') {
            return [false, "Введите телефон"];
        }

        if (phone.length > 23)
            return wrongNumber;

        if (phone[0] === '+') {
            phone = phone.substring(1);
        }

        let clearPhone = '';

        for (let i = 0; i < phone.length; i++) {
            if (!"0123456789() -".includes(phone[i])) {
                return wrongNumber;
            }
            if ("0123456789".includes(phone[i])) {
                clearPhone += phone[i];
            }
        }
        phone = clearPhone;

        if (phone.startsWith('375') && phone.length !== 12) {
            return wrongNumber;
        } else if (phone.startsWith('80') && phone.length !== 11) {
            return wrongNumber;
        } else if (!phone.startsWith('375') && !phone.startsWith('80')) {
            return wrongNumber;
        } else {
            if (phone.startsWith('375')) {
                phone = phone.substring(3);
            } else {
                phone = phone.substring(2);
            }
        }

        let codes = ["29", "33", "44", "25"];

        if (!codes.includes(phone.substring(0, 2))) {
            return wrongNumber;
        }

        return [true, phone];
    }

    static checkName(name) {
        const ALPHABET = "ZXCVBNMASDFGHJKLQWERTYUIOPzxcvbnmlkjhgfdsaqwertyuiopячсмитьбюэждлорпавыфйцукенгшщзхъёЯЧСМИТЬБЮЭЖДЛОРПАВЫФЙЦУКЕНГШЩЗХЪЁ";

        if (name === null || name.length === 0) {
            return "Введите имя";
        }

        if (name.length > 15) {
            return "Слишком длинное имя";
        }

        for (let i = 0; i < name.length; i++) {
            if (!ALPHABET.includes(name[i])) {
                return "Неверное имя";
            }
        }

        return true;
    }

    static checkDiscount(discount) {
        const SYMBOLS = "0123456789";

        if (discount === '') {
            return false;
        }
        for (let i = 0; i < discount.length; i++) {
            if (!SYMBOLS.includes(discount[i])) {
                return false;
            }
        }

        return discount <= 100;
    }

    static checkSessionsNumber(sessions_number) {
        const SYMBOLS = "0123456789";

        if (sessions_number === '') {
            return false;
        }
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