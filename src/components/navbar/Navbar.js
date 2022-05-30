import React from "react";
import "./Navbar.css";
import { useAuth, logout } from "../../auth/Auth";

const Navbar = () => {
    const user = useAuth();

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
                <div>{user?.email}</div>
                <button onClick={() => handleLogout()}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
