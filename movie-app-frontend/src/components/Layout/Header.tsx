import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("userData");
  const isLoggedIn = userDataString !== null;
  const userData = JSON.parse(userDataString || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <nav className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Movie App
        </Link>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <p className="mr-4 text-white">{userData.email}</p>
              <Link
                to="/home"
                className=" text-white font-bold py-2 px-4 mr-2 rounded-md focus:outline-none"
              >
                Your Movies
              </Link>
              <button
                onClick={logout}
                className="hover:underline text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:underline text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md focus:outline-none"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
