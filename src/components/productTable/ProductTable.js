import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../config/firebase.config";
import { storage } from "../../config/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import "./ProductTable.css";

const ProductTable = (props) => {
    const filteredData = useSelector((state) =>
        state.products.products.filter(
            (product) => product.store === props.store
        )
    );

    async function delDoc(id) {
        try {
            console.log(id);
            const docRef = doc(db, "products", id);
            await deleteDoc(docRef);
            const fileRef = ref(storage, id);
            await deleteObject(fileRef);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="product-cont">
            <h2>Listed Products</h2>
            <table className="product-table">
                <tbody>
                    {filteredData?.map((doc) => {
                        return (
                            <tr>
                                <td>
                                    <img src={doc?.img} alt="" />
                                </td>
                                <td>{doc?.title}</td>
                                <td>{doc?.desc}</td>
                                <td>{doc?.price}</td>
                                <td>
                                    <button onClick={() => delDoc(doc.id)}>
                                        delete doc
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
