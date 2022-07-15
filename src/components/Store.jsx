import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPd from "./AddPd";
import PdTable from "./PdTable";
import { useNavigate } from "react-router-dom";

const Store = () => {
    const navigate = useNavigate();
    const { data } = useParams();
    const admin = useSelector((state) => state.auth.current);
    return (
        <div className="min-h-screen bg-slate-300">
            <Navbar />
            <div className="relative mx-auto my-0 h-6 max-w-6xl">
                {admin.role === "admin" && (
                    <button
                        className="absolute -left-14 -bottom-9"
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 fill-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div className="mx-auto my-0 min-h-[calc(100vh-88px)] max-w-6xl rounded-t-xl bg-gray-100 px-2 py-6 text-gray-800">
                {admin.role === "store" && <AddPd />}
                <PdTable storeprop={data} />
            </div>
        </div>
    );
};

export default Store;
