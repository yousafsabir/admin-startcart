import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase.config";
import { storage } from "../../config/firebase.config";
import { useLocation } from "react-router-dom";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useSelector } from "react-redux";
import AddProduct from "../../components/addProduct/AddProduct";
import "./Store.css";
import ProductTable from "../productTable/ProductTable";
const Store = () => {
    const admin = useSelector((state) => state.admin.current);
    const location = useLocation();
    let store;
    admin.role === "store" ? (store = admin?.store) : (store = location.state);

    return (
        <div>
            {admin?.role === "store" ? <AddProduct /> : null}
            <ProductTable store={store} />
        </div>
    );
};

export default Store;
