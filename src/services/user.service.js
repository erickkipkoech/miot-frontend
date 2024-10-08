import axios from "axios";
import authHeader from "./auth-header";
//import API_URL from "../constants/constants";

const API_URL = process.env.API_URL;

//axios.defaults.baseURL = 'https://localhost:7291/api/MiotUserProfile';

const getPublicContent = () => {
    return axios.get(`${API_URL}get_all`);
}
const getHomePageContent =async () => {
    return await axios.get(`MiotUserProfile/user`, { headers: authHeader() });
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
        getHomePageContent,
    }