import React from "react";
import Stores from "./components/Stores";
import { useSelector } from "react-redux";
import Store from "./components/Store";

const Main = () => {
    const admin = useSelector((state) => state.auth.current);
    return <div>{admin.role === "admin" ? <Stores /> : <Store />}</div>;
};

export default Main;
