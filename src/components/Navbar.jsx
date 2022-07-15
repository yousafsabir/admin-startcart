import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = useSelector((state) => state.auth.current);
    return (
        <header className=" w-full bg-gray-800">
            <nav className="mx-auto my-0 flex h-16 max-w-6xl items-center justify-between px-2">
                <h1 className="text-2xl font-bold text-gray-100">
                    {admin?.role === "admin" ? admin?.role : admin?.store}
                </h1>
                <button
                    className="rounded bg-gray-100 p-2 font-semibold text-gray-800 active:scale-95 "
                    onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
