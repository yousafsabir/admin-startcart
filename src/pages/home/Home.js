import React from "react";
import Navbar from "../../components/navbar/Navbar";
import AllStores from "../../components/allStores/AllStores";
import Store from "../../components/store/Store";
import { useSelector } from "react-redux";
import "./Home.css";
const Home = () => {
    const admin = useSelector((state) => state.admin.current);

    return (
        <>
            <Navbar />
            {admin?.role === "admin" ? <AllStores /> : <Store />}
        </>
    );
};

export default Home;
