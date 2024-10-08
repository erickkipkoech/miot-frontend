import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import userService from "../../services/user.service";

const Home = () => {
    const [content, setContent] = useState("");

    const { isLoggedIn, user } = useSelector((state) => state.authReducer || { isLoggedIn: false, user: null });


    useEffect(() => {
        if(isLoggedIn){
            userService.getHomePageContent().then(
            (response) => { setContent(response.data) },
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
    if(!isLoggedIn){
        return <Navigate to={"/login"}/>
    }
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content.response}</h3>
            </header>
        </div>
    );
};

export default Home;