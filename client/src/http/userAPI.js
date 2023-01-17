import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (name, phone) => {
    try {
        const {data} = await $host.post('/registration', {name, phone})
        return data.phone;
    } catch (e) {
        window.alert(e.response.data.message);
        return null;
    }
}

export const login = async (phone) => {
    try {
        const {data} = await $host.post('/login', {phone});
        return data.phone;
    } catch (e) {
        window.alert(e.response.data.message);
        return null;
    }
}

export const check = async () => {
        const {data} = await $authHost.get('/auth');
        return jwtDecode(data.token);
}

export const checkCode = async (phone, code) => {
    try {
        const {data} = await $host.post('/check_code', {phone, code});
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (e) {
        window.alert(e.response.data.message);
        return null;
    }

}