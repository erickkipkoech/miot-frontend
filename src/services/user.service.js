import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "../constants/constants";

const getPublicContent = () => {
    return axios.get(`${API_URL}get_all`);

}

const getUserBoard = () => {
    return axios.get(`${API_URL}get_userboard`, { headers: authHeader() });
}

const getModeratorBoard = () => {
    return axios.get(`${API_URL}get_moderatorboard`, { headers: authHeader() });
}

const getAdminBoard = () => {
    return axios.get(`${API_URL}get_adminboard`, { headers: authHeader() });
}

export default
    {
        getPublicContent,
        getUserBoard,
        getModeratorBoard,
        getAdminBoard,
    }