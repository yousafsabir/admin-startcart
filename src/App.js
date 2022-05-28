import { useState, useEffect } from "react";
import { db } from "./config/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { addFire, deleteFire, editFire } from "./CrudOps";
import Login from "./pages/login/Login";
import "./App.css";

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(
        () =>
            onSnapshot(collection(db, "test"), (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => {
                        return { id: doc.id, data: doc.data() };
                    })
                );
            }),
        []
    );
    return (
        <div className="App">
            <header className="App-header">Assalam u Alaikum</header>
            <Login />
        </div>
    );
}

export default App;
