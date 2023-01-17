import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {findUsers} from "../http/AdminAPI";
import {LOGIN_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import ClientsList from "../components/ClientsList";
import {observer} from "mobx-react-lite";

const AdminAccount = observer (() => {
    const {user, clients} = useContext(Context);
    const history = useHistory();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const searchClientsClick = async (name, phone, role) => {
        let users = await findUsers(name, phone, role);
        if (users == null) {
            return;
        }

        clients.setClients(users);
        if (clients.clients.length === 0) {
            clients.clients[0] = 'Ничего не найдено';
        }
    };


    return (
        <ul className="account-menu_list account-menu_list_account ">
            <li>
                {user.name}
            </li>

            <li>
                <input id="phone-input" type="tel" autoComplete="tel" name="phone" placeholder="Телефон"
                       aria-required="true" aria-invalid="false"
                       value = {phone}
                       onChange={e => setPhone(e.target.value)}/>
            </li>

            <li>
                <input id="name-input" type="text" name="name" placeholder="Имя" aria-required="true"
                       aria-invalid="false"
                       value={name}
                       onChange={e => setName(e.target.value)}/>
            </li>

            <li>
                <label>
                <input id="admin-checkbox" type="checkbox" name="admin"
                       checked={role === "ADMIN"}
                       onChange={e => setRole(e.target.checked === true ? "ADMIN" : "USER")}/> admin
                </label>
            </li>

            <li>
                <button id="find-button" onClick={async () => {
                    await searchClientsClick(name, phone, role);
                }}>Найти</button>
            </li>

            <li>
                <button id="clear-button" onClick={() => {
                    clients.setClients([]);
                }}>Очистить</button>
            </li>


            <ClientsList/>



            <li>
                <button id="exit-button" onClick={() => {
                    if (window.confirm("Вы уверены?")) {
                        user.setUser({});
                        user.setIsAuth(false);
                        localStorage.setItem('token', null);
                        clients.setClients([]);

                        history.push(LOGIN_ROUTE);
                    }
                }}>Выйти</button>
            </li>
        </ul>
    );
});

export default AdminAccount;