import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {deleteUser, updateUser} from "../http/AdminAPI";
import Checker from "../utils/checker.js";

const ClientsList = observer(() => {

    let {clients} = useContext(Context);


    const saveClick = async (client) => {
        try {
            if (!Checker.checkDiscount(client.discount)) {
                client.discount = client.discount_old;
            }

            if (!Checker.checkSessionsNumber(client.sessions_number)) {
                client.sessions_number = client.sessions_number_old;
            }

            client.role = Checker.checkRole(client.role);

            await updateUser(client.id, client.discount, client.sessions_number, client.role);

        } catch (e) {
            alert(e.message);
        }

    }

    return (
        <li>
            {clients.clients.length === 0 ?
                "Введите данные для поиска"
                :
                clients.clients.length === 1 && clients.clients[0] === "Ничего не найдено" ?
                    "Ничего не найдено"
                    :
                    <ul>
                        {clients.clients.map(client =>
                            <li key={client.id} className="client-field">
                                <ul>
                                    <li>{client.name}</li>
                                    <li>{client.phone}</li>
                                    {client.shown === true ?
                                        <div>
                                            <li>
                                                скидка
                                                <input id="discount-input" type="text" name="discount"
                                                       placeholder={client.discount}
                                                       aria-required="true" aria-invalid="false"
                                                       value={client.discount}
                                                       onChange={e => client.discount = e.target.value}/>
                                                %
                                            </li>
                                            <li>
                                                меток
                                                <input id="sessions-number-input" type="text" name="sessions-number"
                                                       placeholder={client.sessions_number}
                                                       aria-required="true" aria-invalid="false"
                                                       value={client.sessions_number}
                                                       onChange={e => client.sessions_number = e.target.value}/>
                                            </li>
                                            <li>
                                                <label>
                                                    admin
                                                    <input id="admin-checkbox" type="checkbox" name="admin"
                                                           checked={client.role === "ADMIN"}
                                                           onChange={e => client.role = (e.target.checked === true ? "ADMIN" : "USER")}/>
                                                </label>
                                            </li>
                                            <li>
                                                <button id="save-button" onClick={() => saveClick(client)}>Сохранить
                                                </button>
                                            </li>
                                            <li>
                                                <button id="delete-user-button"
                                                        onClick={async () => window.confirm("Вы уверены?") ? await deleteUser(client.id) : null}>Удалить
                                                    пользователя
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => client.shown = false}>
                                                    <i className="fa fa-angle-up" aria-hidden="true"></i>
                                                </button>
                                            </li>
                                        </div>
                                        :
                                        <li>
                                            <button onClick={() => client.shown = true}>
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </button>
                                        </li>
                                    }

                                </ul>
                            </li>
                        )}
                    </ul>
            }
        </li>
    );
});

export default ClientsList;