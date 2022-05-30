import React from "react";
import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sibebar";
import Header from "../../components/header/Header";
import { logout, useAuth } from "../../auth/Auth";
import "./Home.css";
import Profile from "./Profile";
const Home = () => {
    const isUser = useAuth();
    const handleLogout = () => {
        logout();
    };
    return (
        <>
            <Navbar />
            <div className="home-cont">
                {/* {isUser && <Profile />} */}
                {/* <Sidebar className="sidebar" /> */}
                <Header className="header" />
            </div>
        </>
    );
};

export default Home;
