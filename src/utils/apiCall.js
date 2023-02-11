import axios from 'axios';
import { registerRoute } from '../utils/apiRoute';
import { loginRoute } from '../utils/apiRoute';

export const registerUser = async (user) => {
    try {
        const res = await axios.post(registerRoute, user);
        return res.data;
    } catch (err) {
        return err.response;
    }
}

export const loginUser = async (user) => {
    try {
        const res = await axios.post(loginRoute, user);
        return res.data;
    } catch (err) {
        return err.response;
    }
}