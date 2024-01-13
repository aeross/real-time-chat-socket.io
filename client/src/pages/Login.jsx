import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login() {
    // check if already logged in
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3000/user-info", {
                headers: { token }
            });

            if (res.ok) {
                navigate("/home");
            }
        })();
    }, [])


    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function nameInput(e) {
        setName(e.target.value);
    }

    function passwordInput(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": name, password }),
        });
        const resJson = await res.json();

        if (res.ok) {
            localStorage.setItem("token", resJson.token);
            navigate("/home");
        } else {
            // show error
        }

    }

    return (
        <form className="my-4 flex flex-col gap-2 justify-center items-center">
            <h1 className="my-2 font-semibold text-lg">Login</h1>
            <div>
                <label htmlFor="user-name">username</label>
                <input id="user-name" type="text" onChange={nameInput} className="mx-2 rounded bg-slate-100 border border-gray-700" />
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input id="password" type="password" value={password} onChange={passwordInput} className="mx-2 rounded bg-slate-100 border border-gray-700" />
            </div>
            <button type="submit" onClick={handleSubmit} className="px-3 py-1 m-2 border rounded bg-slate-100">
                login
            </button>

            <Link to="/register" className="text-sm text-blue-500">register instead</Link>
        </form>
    )
}

export default Login