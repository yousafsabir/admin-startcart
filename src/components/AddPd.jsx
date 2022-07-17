import React, { useEffect, useState, useRef } from "react";
import Spinner from "react-spinner-material";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/slices/PdSlice";
import STATUSES from "../redux/Statuses";
import ACTIONS from "../redux/ProductActions";

const AddPd = () => {
    const dispatch = useDispatch();
    const admin = useSelector((store) => store.auth.current);
    const status = useSelector((store) => store.product.status);
    const action = useSelector((store) => store.product.action);
    const storePath = `admins/${admin.storecode}/products`;

    const resetForm = useRef(null);

    useEffect(() => {
        const clearValues = () => {
            if (status === STATUSES.IDLE) {
                setTitle("");
                setDesc("");
                setPrice(null);
                resetForm.current?.click();
                console.log("form cleared");
            }
        };
        return clearValues;
    }, [status]);

    const [photo, setPhoto] = useState(undefined);
    const [catagory, setCatagory] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(null);

    const isValid = Boolean(photo && catagory && title && price && desc);
    console.log(catagory);

    function HandleAdd() {
        dispatch(
            addProduct({
                store: storePath,
                data: {
                    store: admin?.store,
                    catagory,
                    title,
                    desc,
                    price,
                    finalPrice: price,
                    trending: false,
                },
                photo,
            })
        );
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="mx-auto my-8 flex max-w-xl flex-col gap-4 rounded-md bg-gray-300 p-6 "
        >
            <span className="text-sm text-red-500">
                *Image can't be changed later
            </span>
            <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none "
                id="default_size"
                type="file"
                onChange={(e) => {
                    setPhoto(e.target.files[0]);
                }}
            />
            <select
                id="default"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                onChange={(e) => setCatagory(e.target.value)}
            >
                <option defaultChecked className="text-gray-400">
                    Choose a catagory
                </option>
                <option value={"food"}>Food</option>
                <option value={"electronics"}>Electronics</option>
            </select>
            <input
                className="rounded p-2"
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <input
                className="rounded p-2"
                type="text"
                placeholder="Enter the description"
                value={desc}
                onChange={(e) => {
                    setDesc(e.target.value);
                }}
            />
            <input
                className="rounded p-2"
                type="number"
                placeholder="Enter the price"
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
                name=""
                id=""
            />
            {/* Reset button that resets file and catagory input */}
            <input type="reset" value="" ref={resetForm} className="w-0 h-0" />
            <button
                className="flex h-10 w-36 items-center justify-center self-center rounded bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
                onClick={HandleAdd}
                type="submit"
                disabled={
                    status === STATUSES.LOADING || !isValid ? true : false
                }
            >
                {status === STATUSES.LOADING && action === ACTIONS.ADD ? (
                    <Spinner
                        radius={20}
                        color={"#666"}
                        stroke={3}
                        visible={true}
                    />
                ) : (
                    "Add Product"
                )}
            </button>
        </form>
    );
};

export default AddPd;
