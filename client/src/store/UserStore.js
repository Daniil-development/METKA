import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._phone = null;
        this._isLogin = true;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    setIsLogin(bool) {
        this._isLogin = bool;
    }
    setPhone(phone) {
        this._phone = phone;
    }

    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
    get isAdmin() {
        return this._user.role === 'ADMIN';
    }
    get isLogin() {
        return this._isLogin;
    }
    get phone() {
        return this._phone;
    }
    get name() {
        return this._user.name;
    }
    get discount() {
        return this._user.discount;
    }
    get sessions_number() {
        return this._user.sessions_number;
    }

}