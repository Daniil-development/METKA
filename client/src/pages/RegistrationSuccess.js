import React from 'react';
import {useHistory} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const RegistrationSuccess = () => {
    const history = useHistory();

    return (
        <ul className="account-menu_list account-menu_list_registration-successful">
            <li>
                <div id="successful-mark">
                    <i className="fa fa-check-circle"></i>
                </div>
            </li>

            <li>Вы успешно зарегистрировались!</li>

            <li>
                <button id="continue-button" onClick={() => {history.push(LOGIN_ROUTE)}}>Войти</button>
            </li>
        </ul>
    );
};

export default RegistrationSuccess;