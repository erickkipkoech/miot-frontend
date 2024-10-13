import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import userService from "../../services/user.service";
import Header from "./Header";

const Home = () => {
    const [content, setContent] = useState("");

    const { isLoggedIn, user } = useSelector((state) => state.authReducer || { isLoggedIn: false, user: null });

    const appIcon = require('../../assets/app_logo.ico');

    useEffect(() => {
        if (isLoggedIn) {
            userService.getHomePageContent().then(
                (response) => {

                    setContent(JSON.parse(response.data.response))
                },
                (error) => {
                    const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();

                    setContent(_content);
                }
            )
        }
    }, []);
    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }
    return (
        <div className="mx-auto bg-slate-950 min-h-screen text-white">
            <Header appIcon={appIcon} userName={content.UserName} />
            {/* <header className="bg-gray-800 p-4 rounded-md shadow-md flex items-center">
                <img
                    src={appIcon}
                    alt="profile-img"
                    className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold">{content.UserName}</h3>
                </div>
            </header> */}
        </div>
    );    
};

export default Home;