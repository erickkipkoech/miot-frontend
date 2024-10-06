import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
    const { isLoggedIn, user } = useSelector((state) => state.authReducer || { isLoggedIn: false, user: null });

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />;
    }
    return (
        <div className="container mx-auto p-4 bg-slate-950 min-h-screen text-white">
            <header className="bg-gray-800 p-4 rounded-md shadow-md">
                <h3 className="text-2xl font-bold">
                    <strong>{user.username}</strong> Profile
                </h3>
            </header>
            <div className="mt-4 p-4 bg-gray-700 rounded-md shadow-sm">
                <p>
                    <strong>Token:</strong> {user.response.substring(0, 20)} ...{" "}
                    {user.response.substring(user.response.length - 20)}
                </p>
                <p className="mt-2">
                    <strong>Id:</strong> {user.id}
                </p>
                <p className="mt-2">
                    <strong>Email:</strong> {user.email}
                </p>
                <div className="mt-4">
                    <strong>Authorities:</strong>
                    <ul className="list-disc list-inside">
                        {user.roles &&
                            user.roles.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;
