import {makeAutoObservable} from "mobx";

export default class ClientsStore {
    constructor() {
        this._clients = [];
        makeAutoObservable(this);
    }
    setClients(clients) {
        this._clients = clients;

        for (let i = 0; i < clients.length; i++) {
            this._clients[i].shown = false;
            this._clients[i].discount_old = clients[i].discount;
            this._clients[i].sessions_number_old = clients[i].sessions_number;
        }
    }

    get clients () {
        return this._clients;
    }
}