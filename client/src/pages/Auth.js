import React, {useContext, useState} from 'react';
import {CHECK_CODE_ROUTE, INDEX_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useHistory, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import Checker from "../utils/checker";

const Auth = observer(() => {
    let {user} = useContext(Context);
    const history = useHistory();
    const location = useLocation();

    const isLogin = location.pathname === LOGIN_ROUTE || location.pathname === INDEX_ROUTE;
    user.setIsLogin(isLogin);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const loginClick = async () => {
        try {
            if (isLogin) {

                let phoneCheckResult = Checker.checkPhone(phone);

                if (phoneCheckResult[0] !== true) {
                    let phoneError = document.querySelector(".phone-input_error");
                    phoneError.textContent = phoneCheckResult[1];
                    phoneError.classList.remove("error_hidden");
                    return;
                } else {
                    let phoneError = document.querySelector(".phone-input_error");
                    phoneError.classList.add("error_hidden");
                }
                user.setPhone(await login(phoneCheckResult[1]));

                if (user.phone === null) {
                    return;
                }


            } else {
                let error = false;

                let phoneCheckResult = Checker.checkPhone(phone);

                if (phoneCheckResult[0] !== true) {
                    let phoneError = document.querySelector(".phone-input_error");
                    phoneError.textContent = phoneCheckResult[1];
                    phoneError.classList.remove("error_hidden");
                    error = true;
                } else {
                    let phoneError = document.querySelector(".phone-input_error");
                    if (!phoneError.classList.contains("error_hidden")) {
                        phoneError.classList.add("error_hidden");
                    }
                }

                let nameCheckResult = Checker.checkName(name);

                if (nameCheckResult !== true) {
                    let nameError = document.querySelector(".name-input_error");
                    nameError.textContent = nameCheckResult;
                    nameError.classList.remove("error_hidden");
                    error = true;
                } else {
                    let nameError = document.querySelector(".name-input_error");
                    if (!nameError.classList.contains("error_hidden")) {
                        nameError.classList.add("error_hidden");
                    }
                }

                if (error) {
                    return;
                }

                user.setPhone(await registration(name, phoneCheckResult[1]));

                if (user.phone === null) {
                    return;
                }
            }
            history.push(CHECK_CODE_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    }

    return (

        <ul className="account-menu_list account-menu_list_login">
            <li>Привет!</li>

            {isLogin ?
                <div></div>
                :
                <div>

                    <li className="registration-item">
                        <label htmlFor="name-input">Ваше Имя</label>
                    </li>
                    <li className="registration-item">
                        <input id="name-input" type="text" name="name" placeholder="Имя" aria-required="true"
                               aria-invalid="false"
                        value={name}
                        onChange={e => e.target.value.length < 16 ? setName(e.target.value) : null}/>
                    </li>

                    <li className="name-input_error error_hidden">Неверное имя</li>

                </div>
            }

            <li>
                <label htmlFor="phone-input">Телефон</label>
            </li>
            <li>
                <input id="phone-input" type="tel" autoComplete="tel" name="phone" placeholder="Телефон"
                       required pattern="^d{2}-d{7}$"
                       aria-required="true" aria-invalid="false"
                       value={phone}
                       onChange={e => e.target.value.length < 20 ? setPhone(e.target.value) : null}/>
            </li>
            <li className="phone-input_error error_hidden">Неверный телефон</li>
            <li>
                <button id="login-button" onClick={async () => {
                    await loginClick();

                }}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
            </li>
            <li id="have_account">{isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}</li>
            <li>
                <button id="registration-button" onClick={() => {
                    if (isLogin) {
                        history.push(REGISTRATION_ROUTE);
                    } else {
                        history.push(LOGIN_ROUTE);
                    }
                }}>{isLogin ? 'Зарегистрироваться' : 'Войти'}</button>
            </li>
        </ul>

    );
});

export default Auth;