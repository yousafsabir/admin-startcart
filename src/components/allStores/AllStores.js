import React from "react";
import ProductTable from "../productTable/ProductTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AllStores.css";

const AllStores = () => {
    const navigate = useNavigate();
    const stores = useSelector((state) =>
        state.admin.all.filter((admin) => admin.role === "store")
    );
    const toStore = (store) => {
        navigate("/store", {
            state: store,
        });
    };
    return (
        <>
            <div className="all-stores">
                <h2>List of All stores</h2>
                <ul className="store-list">
                    {stores.map((store, index) => {
                        return (
                            <li onClick={() => toStore(store?.store)}>
                                <span>{index + 1}:</span>
                                {store?.store}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default AllStores;
