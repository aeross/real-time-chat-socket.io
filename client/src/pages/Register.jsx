import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

function Register() {
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
        await fetch(`http://localhost:3000/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": name, password }),
        });
    }

    return (
        <form>
            <h1>Register</h1>
            <div>
                <label htmlFor="user-name">username</label>
                <input id="user-name" type="text" onChange={nameInput} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={passwordInput} />
            </div>
            <button type="submit" onClick={handleSubmit}>register</button>
        </form>
    )
}

export default Register