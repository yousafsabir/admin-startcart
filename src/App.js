import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";

function App() {
    const isUser = useSelector((state) => state.admin.isCurrent);

    const PublicRoute = ({ isUser, redirectPath = "/", children }) => {
        if (isUser) {
            return <Navigate to={redirectPath} replace />;
        }

        return children ? children : <Outlet />;
    };

    const PrivateRoute = ({ isUser, redirectPath = "/login", children }) => {
        if (!isUser) {
            return <Navigate to={redirectPath} replace />;
        }

        return children ? children : <Outlet />;
    };
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute isUser={isUser}>
                            <Home />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute isUser={isUser}>
                            <Login />
                        </PublicRoute>
                    }
                />
            </Routes>
            {/* <Login />
            <Home /> */}
        </>
    );
}

export default App;
