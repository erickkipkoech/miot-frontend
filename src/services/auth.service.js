import axios from "axios";
import API_URL from "../constants/constants";

//const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = 'https://localhost:7291/api/';

let res = null;

const register = async (username, email, password) => {
    return await axios
        .post(`${API_URL}register`, {
            username,
            email,
            password
        });

};

const login = async (username, password) => {
    const response = await axios
        .post("MiotAuthenticate/login", {
            username,
            password
        });
    if (response.data.response) {
        res = response.data;
        localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};