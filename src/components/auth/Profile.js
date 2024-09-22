import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
    const { isLoggedIn, user } = useSelector((state) => state.authReducer || { isLoggedIn: false, user: null });

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />;
    }
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{user.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {user.response.substring(0, 20)} ...{" "}
                {user.response.substr(user.response.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {user.id}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {user.roles &&
                    user.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
}

export default Profile;