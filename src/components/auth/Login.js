import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../../actions/auth";
import { required } from "./validations/validations";

const Login = (props) => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.authReducer?.isLoggedIn || false);
    const message = useSelector(state => state.message || null);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
                .then(() => {
                    navigate("/home");
                    //window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                })
        } else {
            setLoading(false);
        }

    };
    if (isLoggedIn) {
        return <Navigate to={"/home"} />;
    }
    const backgroundImage = require('../../assets/sign_in.png');
    const signInAvatar = require('../../assets/app_logo.ico');

    return (
        <div className="h-dvh bg-fill bg-center flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="card-container rounded-lg">
                <img
                    src={signInAvatar}
                    alt="profile-img"
                    className="profile-img-card w-20 h-20 mx-auto mb-4"
                />
                <Form onSubmit={handleLogin} ref={form}>
                    {/* Username Input with Icon */}
                    <div className="form-group mb-4 relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {/* Username Icon */}
                            <svg className="h-5 w-5 text-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-4.5 6a7.5 7.5 0 019 0l-9 0z" />
                            </svg>
                        </span>
                        <Input
                            type="text"
                            className="form-control w-full pl-10 py-2 bg-blue border-2 border-zinc-600 text-white rounded-md"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    {/* Password Input with Icon */}
                    <div className="form-group mb-4 relative">
                        <div>
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {/* Password Icon */}
                                <svg className="h-5 w-5 text-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 8V6a5 5 0 0110 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2h1zm2 0h6V6a3 3 0 00-6 0v2z" />
                                </svg>
                            </span>
                            <Input
                                type={showPassword ? "text" : "password"}
                                className="form-control w-full pl-10 py-2 bg-blue border-2 border-zinc-600 text-white rounded-md"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                            <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {/* View/Hide Icon */}
                                {showPassword ? (
                                    <svg className="h-5 w-5 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.28 5.28a9 9 0 01-12.56 0M2.458 12C3.732 7.943 7.82 5 12 5c4.18 0 8.268 2.943 9.542 7-1.274 4.057-5.362 7-9.542 7-2.83 0-5.385-1.085-7.28-2.72" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A9 9 0 014.243 6.243M9 3.938A9 9 0 0118.825 13.875m0-4.95A9 9 0 019.075 4.075M9.172 9.172a4 4 0 015.656 5.656" />
                                    </svg>
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="form-group mb-4">
                        <button className="btn btn-primary w-full py-2 px-4 bg-white border border-gray-300 text-blue rounded-md" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm mr-2"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {/* Google Sign-In Button */}
                    <div className="form-group mb-4">
                        <button className="btn btn-primary w-full py-2 px-4 bg-blue border-2 border-zinc-600 text-white rounded-md flex justify-center items-center" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm mr-2"></span>
                            )}
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Icon" className="h-5 w-5 mr-2" />
                            <span>Sign in with Google</span>
                        </button>
                    </div>

                    {/* Sign Up Section */}
                    <div className="form-group mb-4 text-center">
                        <span className="text-sm text-gray-600">Don't have an account?</span>
                        <a href="/signup" className="text-blue-500 ml-2 hover:underline">Sign Up</a>
                    </div>

                    {/* Error Message Display */}
                    {message && (
                        <div className="form-group">
                            <div className="text-white alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );


}

export default Login;