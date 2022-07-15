import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import Main from "./Main";
import Store from "./components/Store";

const Routing = () => {
    const admin = useSelector((state) => state.auth.isPresent);
    // const admin = true;

    const PublicRoute = ({ isUser, children }) => {
        if (isUser) {
            return <Navigate to={"/"} replace />;
        }

        return children ? children : <Outlet />;
    };

    const PrivateRoute = ({ isUser, children }) => {
        if (!isUser) {
            return <Navigate to={"/login"} replace />;
        }

        return children ? children : <Outlet />;
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute isUser={admin}>
                        <Main />
                    </PrivateRoute>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicRoute isUser={admin}>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route path="/store/:data" element={<Store />} />
        </Routes>
    );
};

export default Routing;
