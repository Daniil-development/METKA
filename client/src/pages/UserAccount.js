import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {Context} from "../index";
import {LOGIN_ROUTE} from "../utils/consts";

const UserAccount = () => {
    const {user} = useContext(Context);
    const history = useHistory();

    return (
        <ul className="account-menu_list account-menu_list_account ">
            <li>
                Привет,<br/>
                <span>{user.name}</span>
                !
            </li>

            <li>
                Ваша персональная скидка
                <div id="user-discount" className="red-circle">
                    {user.discount}%
                </div>
            </li>

            <li>
                Вы носите
                <div id="user-tattoo_count" className="red-circle">
                    {user.sessions_number}
                </div>
                меток, которые сделали мы
            </li>

            <li>
                <button id="exit-button" onClick={() => {
                    if (window.confirm("Вы уверены?")) {
                        user.setUser({});
                        user.setIsAuth(false);
                        localStorage.setItem('token', null);

                        history.push(LOGIN_ROUTE);
                    }
                }}>Выйти</button>
            </li>
        </ul>
    );
};

export default UserAccount;