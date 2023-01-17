import {$host} from "./index";

export const findUsers = async (name, phone, role) => {
    try {
        const {data} = await $host.post('/admin/users/find', {name, phone, role});
        return data;
    } catch (e) {
        window.alert(e.response.data.message);
        return null;
    }
}

export const updateUser = async (id, discount, sessions_number, role) => {
    try {
        const {data} = await $host.post('/admin/users/update', {id, discount, sessions_number, role});
        return data;
    } catch (e) {
        window.alert(e.response.data.message);
        return null;
    }
}

export const deleteUser = async (id) => {
    try {
        const {data} = await $host.post('/admin/users/delete', {id});
        return data;
    } catch (e) {
        window.alert(e.response.data.message);
        return null;
    }
}