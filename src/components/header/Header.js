import React, { useState, useEffect } from "react";
import Spinner from "react-spinner-material";
import { db } from "../../config/firebase.config";
import { storage } from "../../config/firebase.config";
import {
    collection,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    onSnapshot,
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
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

    const [isLoading, setIsLoading] = useState(false);

    const [photo, setPhoto] = useState(null);
    const [catagory, setCatagory] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(null);

    const isValid = photo && catagory && title && desc && price;

    async function handleAdd() {
        try {
            setIsLoading(true);
            // making empty product document
            const collectionRef = collection(db, "products");
            const docSnap = await addDoc(collectionRef, {});
            // uploading photo to storage
            const fileRef = ref(storage, docSnap.id);
            const photoSnap = await uploadBytes(fileRef, photo);
            const photoUrl = await getDownloadURL(fileRef);
            // setting the document
            let docRef = doc(db, "products", docSnap.id);
            await setDoc(docRef, {
                id: docSnap.id,
                store: "khan beverages",
                catagory,
                img: photoUrl,
                title,
                desc,
                price,
                finalPrice: price,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function delDoc(id) {
        try {
            setIsLoading(true);
            console.log(id);
            const docRef = doc(db, "products", id);
            await deleteDoc(docRef);
            const fileRef = ref(storage, id);
            await deleteObject(fileRef);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <div className="header-form">
                <div>
                    <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => {
                            setPhoto(e.target.files[0]);
                        }}
                    />
                    <span>
                        <span style={{ color: "red" }}>*</span>it can't be
                        changed later
                    </span>
                </div>
                <select name="" id="">
                    <option value={null} default>
                        Select catagory
                    </option>
                    <option
                        value="electronics"
                        onClick={(e) => {
                            setCatagory(e.target.value);
                        }}
                    >
                        electronics
                    </option>
                    <option
                        value="food"
                        onClick={(e) => {
                            setCatagory(e.target.value);
                        }}
                    >
                        food
                    </option>
                </select>
                <input
                    type="text"
                    placeholder="Enter the title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Enter the description"
                    onChange={(e) => {
                        setDesc(e.target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="Enter the price"
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    name=""
                    id=""
                />
                <button
                    onClick={handleAdd}
                    disabled={isLoading || !isValid ? true : false}
                >
                    {isLoading ? (
                        <Spinner
                            radius={17}
                            color={"#333"}
                            stroke={2}
                            visible={true}
                        />
                    ) : (
                        "Add Product"
                    )}
                </button>
            </div>

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
