import React, { useState } from "react";
import Spinner from "react-spinner-material";
import { useSelector } from "react-redux";
import { db, storage } from "../../config/firebase.config";
import { usAdd } from "../../CrudOps";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./AddProduct.css";

const AddProduct = () => {
    const currentAdmin = useSelector((state) => state.admin.current);

    const [isLoading, setIsLoading] = useState(false);

    const [photo, setPhoto] = useState(null);
    const [catagory, setCatagory] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(null);

    const isValid = photo && catagory && title && desc && price;

    async function HandleAdd() {
        try {
            setIsLoading(true);
            usAdd(
                {
                    store: currentAdmin?.store,
                    catagory,
                    title,
                    desc,
                    price,
                    finalPrice: price,
                },
                photo
            );
            // making empty product document
            // const collectionRef = collection(db, "products");
            // const docSnap = await addDoc(collectionRef, {});
            // uploading photo to storage
            // const fileRef = ref(storage, docSnap.id);
            // const photoSnap = await uploadBytes(fileRef, photo);
            // const photoUrl = await getDownloadURL(fileRef);
            // setting the document
            // let docRef = doc(db, "products", docSnap.id);
            // await setDoc(docRef, {
            //     id: docSnap.id,
            //     store: currentAdmin?.store,
            //     catagory,
            //     img: photoUrl,
            //     title,
            //     desc,
            //     price,
            //     finalPrice: price,
            // });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="product-cont">
            <div className="product-form">
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
                    onClick={HandleAdd}
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
        </div>
    );
};

export default AddProduct;
