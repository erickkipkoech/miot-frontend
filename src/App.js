import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import './App.css'

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Users/Home";
import Profile from "./components/auth/Profile";
import BoardUser from "./components/Users/RolesBased/BoardUser";
import BoardModerator from "./components/Users/RolesBased/BoardModerator";
import BoardAdmin from "./components/Users/RolesBased/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/messages";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const currentUser = useSelector((state) => state.auth?.user || null);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <div>
      {/* <nav className="bg-gray-900 bg-opacity-100 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={"/"} className="text-xl font-semibold">
            Nam Kobelebik
          </Link>
          <div className="flex space-x-4">
            <Link to={"/home"} className="text-white hover:text-gray-300">
              Home
            </Link>

            {showModeratorBoard && (
              <Link to={"/mod"} className="text-white hover:text-gray-300">
                Moderator Board
              </Link>
            )}

            {showAdminBoard && (
              <Link to={"/admin"} className="text-white hover:text-gray-300">
                Admin Board
              </Link>
            )}

            {currentUser && (
              <Link to={"/user"} className="text-white hover:text-gray-300">
                User
              </Link>
            )}
          </div>

          <div className="flex space-x-4">
            {currentUser ? (
              <>
                <Link to={"/profile"} className="text-white hover:text-gray-300">
                  {currentUser.username}
                </Link>
                <a
                  href="/login"
                  className="text-white hover:text-gray-300"
                  onClick={logOut}
                >
                  LogOut
                </a>
              </>
            ) : (
              <>
                <Link to={"/login"} className="text-white hover:text-gray-300">
                  Login
                </Link>
                <Link to={"/register"} className="text-white hover:text-gray-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav> */}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
