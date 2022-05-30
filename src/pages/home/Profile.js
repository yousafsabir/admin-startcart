import React, { useState } from "react";
import { upload } from "../../CrudOps";
import { useAuth } from "../../auth/Auth";
import Avatar from "./pngegg.png";

const Profile = () => {
    const user = useAuth();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState(null);
    function handlePhoto(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }
    async function handleClick() {
        if (photo && type) {
            setLoading(true);
            await upload(user.uid, photo, type);
            setLoading(false);
        }
    }

    return (
        <div>
            <input type="file" onChange={handlePhoto} />
            <select name="" id="">
                <option value={null} defaultChecked>
                    select img type
                </option>
                <option
                    value="png"
                    onClick={(e) => {
                        setType(e.target.value);
                    }}
                >
                    png
                </option>
                <option
                    value="jpg"
                    onClick={(e) => {
                        setType(e.target.value);
                        console.log(type);
                    }}
                >
                    jpg
                </option>
            </select>
            <button
                onClick={handleClick}
                disabled={(photo && type) || !loading ? false : true}
            >
                Upload
            </button>
            {loading ? <span>loading..</span> : null}
            <img
                src={Avatar}
                alt=""
                style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectPosition: "center",
                    border: "5px outset #333",
                }}
            />
        </div>
    );
};

export default Profile;
