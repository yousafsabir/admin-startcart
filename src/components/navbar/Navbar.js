import React, { useEffect } from "react";
import { db } from "../../config/firebase.config";
import { onSnapshot, collection } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { removeCurrent } from "../../redux/slices/adminSlice";
import { addProduct } from "../../redux/slices/productsSlice";
import { logout } from "../../auth/Auth";
import "./Navbar.css";

const Navbar = () => {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin.current);
    // dispatching products to store
    useEffect(
        () =>
            onSnapshot(collection(db, "products"), (snapshot) => {
                snapshot.docs.map((doc) => {
                    return dispatch(addProduct(doc.data()));
                });
            }),
        [dispatch]
    );

    const handleLogout = () => {
        logout();
        dispatch(removeCurrent());
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
                <h2>{admin?.role === "admin" ? admin?.role : admin?.store}</h2>
                <button onClick={() => handleLogout()}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
