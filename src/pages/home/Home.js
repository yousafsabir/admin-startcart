import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sibebar";
import Header from "../../components/header/Header";
import "./Home.css";
const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home-cont">
                <Sidebar className="sidebar" />
                <Header className="header" />
            </div>
        </>
    );
};

export default Home;
