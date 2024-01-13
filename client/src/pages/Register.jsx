import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {
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
        await fetch(`http://localhost:3000/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": name, password }),
        });
    }

    return (
        <form className="my-4 flex flex-col gap-2 justify-center items-center">
            <h1 className="my-2 font-semibold text-lg">Register</h1>
            <div>
                <label htmlFor="user-name">username</label>
                <input id="user-name" type="text" onChange={nameInput} className="mx-2 rounded bg-slate-100 border border-gray-700" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={passwordInput} className="mx-2 rounded bg-slate-100 border border-gray-700" />
            </div>
            <button type="submit" onClick={handleSubmit} className="px-3 py-1 m-2 border rounded bg-slate-100">
                register
            </button>
            <Link to="/login" className="text-sm text-blue-500">login instead</Link>
        </form>
    )
}

export default Register