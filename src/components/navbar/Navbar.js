import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { logout, useAuth } from "../../auth/Auth";

const Navbar = () => {
    // const user = useAuth();
    const user = useSelector((state) => state.admin.current);

    const handleLogout = () => {
        // logout();
        console.log(user);
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
