import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Stores = () => {
    const stores = useSelector((state) =>
        state.auth.data.filter((store) => store.role === "store")
    );
    return (
        <div className="min-h-screen bg-slate-300">
            <Navbar />
            <div className="mx-auto my-0 mt-6 min-h-[calc(100vh-88px)] max-w-6xl rounded-t-xl bg-gray-100 px-2 py-6 text-gray-800">
                <h2 className="text-center text-2xl font-bold">
                    List of All Stores
                </h2>
                <ul className="space-y-3">
                    {stores?.map((store, index) => (
                        <li
                            className="rounded border border-gray-300 px-2 py-1 text-lg shadow transition-shadow duration-150 hover:shadow-md"
                            key={index}
                        >
                            <Link to={"/store/" + store.storecode}>
                                {store.store}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Stores;
