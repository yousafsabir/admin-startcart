import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import {
    addId,
    deleteProduct,
    editModeFalse,
    editModeTrue,
    makeTrending,
    saveEdit,
} from "../redux/slices/PdSlice";
import STATUSES from "../redux/Statuses";
import ACTIONS from "../redux/ProductActions";
import Spinner from "react-spinner-material";

const PdTable = (props) => {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.auth.current);
    const status = useSelector((state) => state.product.status);
    const action = useSelector((state) => state.product.action);
    const documentId = useSelector((state) => state.product.docId);
    const editMode = useSelector((state) => state.product.edit);
    const store = admin.storecode || props.storeprop;
    const storePath = `admins/${store}/products`;

    const [products, setProducts] = useState([]);

    useEffect(
        () =>
            onSnapshot(collection(db, storePath), (snapshot) => {
                setProducts(
                    snapshot.docs.map((doc) => {
                        return { ...doc.data() };
                    })
                );
            }),
        [store]
    );

    const handleTrending = (docId, payload) => {
        dispatch(makeTrending({ store: storePath, docId, payload }));
    };

    const handleDelete = (docId) => {
        dispatch(deleteProduct({ store: storePath, docId }));
    };

    // states for edit
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(undefined);

    const setEdit = (docId, title, desc, price) => {
        dispatch(editModeTrue());
        dispatch(addId(docId));
        setTitle(title);
        setDesc(desc);
        setPrice(price);
    };

    const handleEdit = (docId) => {
        dispatch(saveEdit({ store: storePath, docId, title, desc, price }));
    };

    const cancelEdit = () => {
        dispatch(editModeFalse());
    };

    return (
        <>
            <h2 className="relative my-8 text-center text-2xl font-bold">
                Products
            </h2>
            <div className=" overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-300 text-xs uppercase text-gray-700 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trending
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product.id} className="border-b bg-white ">
                                <th
                                    scope="row"
                                    className="whitespace-nowrap py-4 pl-3 font-medium text-gray-900 "
                                >
                                    <img
                                        className="max-h-20"
                                        src={product.img}
                                        alt=""
                                    />
                                </th>
                                <td className="px-1 py-4">
                                    {documentId === product.id && editMode ? (
                                        <input
                                            className="rounded-sm bg-slate-100 p-1"
                                            type="text"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    ) : (
                                        product.title
                                    )}
                                </td>
                                <td className="px-1 py-4">
                                    {documentId === product.id && editMode ? (
                                        <textarea
                                            className="resize-none rounded-sm bg-slate-100 p-1"
                                            value={desc}
                                            onChange={(e) =>
                                                setDesc(e.target.value)
                                            }
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="3"
                                        ></textarea>
                                    ) : (
                                        product.desc
                                    )}
                                </td>
                                <td className="px-1 py-4">
                                    {documentId === product.id && editMode ? (
                                        <input
                                            className="rounded-sm bg-slate-100 p-1"
                                            type="text"
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                        />
                                    ) : (
                                        `Rs.${product.price}`
                                    )}
                                </td>
                                <td className="px-1 py-4">
                                    {product.trending ? "Yes" : "No"}
                                </td>
                                <td className="space-y-1 py-4 text-right text-gray-100">
                                    {admin.role === "admin" && (
                                        <button
                                            disabled={
                                                status === STATUSES.LOADING
                                            }
                                            className="flex h-6 w-40 items-center justify-center rounded bg-blue-400 px-2 py-1"
                                            onClick={() =>
                                                handleTrending(
                                                    product.id,
                                                    !product.trending
                                                )
                                            }
                                        >
                                            {action === ACTIONS.TRENDING &&
                                            documentId === product.id ? (
                                                <Spinner
                                                    color="#ddd"
                                                    stroke={2}
                                                    radius={16}
                                                />
                                            ) : (
                                                "Toggle Trending"
                                            )}
                                        </button>
                                    )}
                                    {admin.role === "store" &&
                                        documentId !== product.id && (
                                            <button
                                                disabled={
                                                    status === STATUSES.LOADING
                                                }
                                                className="flex h-6 w-40 items-center justify-center rounded bg-blue-400 px-2 py-1"
                                                onClick={() =>
                                                    setEdit(
                                                        product.id,
                                                        product.title,
                                                        product.desc,
                                                        product.price
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>
                                        )}
                                    {documentId !== product.id && (
                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            disabled={
                                                status === STATUSES.LOADING
                                            }
                                            className="flex h-6 w-40 items-center justify-center rounded bg-red-400 px-2 py-1"
                                        >
                                            {action === ACTIONS.REMOVE &&
                                            documentId === product.id ? (
                                                <Spinner
                                                    color="#ddd"
                                                    stroke={2}
                                                    radius={16}
                                                />
                                            ) : (
                                                "Remove Product"
                                            )}
                                        </button>
                                    )}
                                    {editMode && documentId === product.id && (
                                        <>
                                            <button
                                                className="flex h-6 w-40 items-center justify-center rounded bg-blue-400 px-2 py-1"
                                                onClick={() =>
                                                    handleEdit(product.id)
                                                }
                                            >
                                                {action === ACTIONS.EDIT &&
                                                documentId === product.id ? (
                                                    <Spinner
                                                        color="#ddd"
                                                        stroke={2}
                                                        radius={16}
                                                    />
                                                ) : (
                                                    "Save"
                                                )}
                                            </button>
                                            <button
                                                disabled
                                                className="flex h-6 w-40 items-center justify-center rounded bg-red-400 px-2 py-1"
                                                onClick={cancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PdTable;
