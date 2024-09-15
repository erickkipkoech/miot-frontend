import axios from "axios";
import API_URL from "../constants/constants";

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
        .post(`${API_URL}login`, {
            username,
            password
        });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};