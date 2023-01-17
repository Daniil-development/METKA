import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_SUCCESS_ROUTE, USER_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {checkCode} from "../http/userAPI";

const CheckCode = () => {
    let {user} = useContext(Context);

    const history = useHistory();

    const [code, setCode] = useState('');


    const codeCheckClick = async () => {
        if (code == null || code === "") {
            window.alert("Некорректный код");
            return;
        }

        let data;
        try {
            data = await checkCode(user.phone, code);

            if (data == null) {
                return;
            }

            if (user.isLogin) {
                user.setUser(data);
                user.setIsAuth(true);

                user.isAdmin ?
                    history.push(ADMIN_ROUTE)
                    :
                    history.push(USER_ROUTE)
            } else {
                history.push(REGISTRATION_SUCCESS_ROUTE)
            }

        } catch (e) {
            window.alert(e.message);
        }
    }

    return (
        <ul className="account-menu_list account-menu_list_confirm ">
            <li>Введите код подтверждения из СМС</li>

            <li className="">
                <label htmlFor="code-input">Код</label>
            </li>
            <li className="">
                <input id="code-input" type="text" name="code" placeholder="Код" aria-required="true"
                       aria-invalid="false"
                       value={code}
                       onChange={e =>e.target.value.length < 5 ? setCode(e.target.value) : null}/>
            </li>

            <li className="code-input_error error_hidden">Неверный код</li>

            <li>
                <button id="code-check_button" onClick={async () => {
                    await codeCheckClick();


                }}>Проверить</button>
            </li>
            <li>
                <button id="code-check_cancel_button" onClick={() => {history.push(LOGIN_ROUTE)}}>Отменить</button>
            </li>
        </ul>
    );
};

export default CheckCode;