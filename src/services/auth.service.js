import axios from "axios";
import API_URL from "../constants/constants.js";

const register=(username, email, password)=>{
    return axios
            .post(`${API_URL}/register`,{
                username,
                email,
                password
            });

};

const login=(username,password)=>{
    return axios
    .post(`${API_URL}/login`,{
        username,
        password
    }).then((response)=>{
        if (response.data.accessToken){
            localStorage.setItem("user",JSON.stringify(response.data))
        }
        return response.data;
    });
};

const logout=()=>{
    localStorage.removeItem("user");
};