import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import STATUSES from "./redux/Statuses";
import AUTH from "./redux/AuthActions";
import Spinner from "react-spinner-material";
import { fetchAdmins, login } from "./redux/slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const action = useSelector((state) => state.auth.action);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (status === STATUSES.IDLE) {
      clearValues();
    }
  }, [status]);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, []);

  function clearValues() {
    setEmail("");
    setPassword("");
  }

  function handleLogin() {
    dispatch(login({ email, password }));
  }

  if (action === AUTH.FETCHADMINS) {
    return (
      <div className="flex flex-col min-h-screen w-full items-center justify-center  gap-4 bg-slate-300">
        {status === STATUSES.LOADING && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 ">
              Starting Admin Panel
            </h2>
            <div className="bg-slate-400 w-96 h-3 rounded-full overflow-hidden">
              <div className="h-3 w-24 bg-blue-500 rounded-full animate-loading"></div>
            </div>
          </>
        )}
        {status === STATUSES.ERROR && (
          <span className="text-center text-lg text-red-600 ">
            ☹ An error occoured. <br /> Refresh page or check your internet
            connection
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center  bg-slate-300">
      <main className="flex w-[350px] flex-col gap-3 rounded-md bg-gray-100 px-6 py-8">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <input
          className="rounded p-1"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="rounded p-1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="flex h-8 items-center justify-center rounded bg-gray-800 py-1 text-gray-100 active:scale-95 disabled:cursor-not-allowed"
          disabled={!email && !password}
          onClick={handleLogin}
        >
          {status === STATUSES.LOADING ? (
            <Spinner radius={17} color={"#fff"} stroke={2} visible={true} />
          ) : (
            "Login"
          )}
        </button>
        {status === STATUSES.ERROR && (
          <span className="text-xs text-red-500 ">
            *An error occured, please try again
          </span>
        )}
      </main>
    </div>
  );
};

export default Login;
