import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
    const isLoggedIn = useSelector((state) => state.authReducer?.isLoggedIn || false);
    const currentUser = useSelector((state)=>state.authReducer?.user || null)

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />;
    }
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.response.substring(0, 20)} ...{" "}
                {currentUser.response.substr(currentUser.response.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
}

export default Profile;