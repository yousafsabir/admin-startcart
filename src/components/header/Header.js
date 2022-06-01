import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase.config";
import { storage } from "../../config/firebase.config";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import "./Header.css";
const Header = () => {
    const [data, setData] = useState([]);
    useEffect(
        () =>
            onSnapshot(collection(db, "products"), (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => {
                        return doc.data();
                    })
                );
            }),
        []
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
        <div>
            <table className="header-table">
                <tbody>
                    {data?.map((doc) => {
                        return (
                            <tr>
                                <td>
                                    <img src={doc.img} alt="" />
                                </td>
                                <td>{doc.title}</td>
                                <td>{doc.desc}</td>
                                <td>{doc.price}</td>
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

export default Header;
