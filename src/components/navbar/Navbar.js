import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { logout } from "../../auth/Auth";

const Navbar = () => {
    const user = useSelector((state) => state.admin.current);

    const handleLogout = () => {
        logout();
    };
    return (
        <div
            style={{
                width: "100%",
                backgroundColor: "#9a0000",
                color: "white",
            }}
        >
            <div className="nav-cont">
                <div>{user?.store}</div>
                <button onClick={() => handleLogout()}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
