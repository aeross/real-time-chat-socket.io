import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

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
        <form>
            <h1>Login</h1>
            <div>
                <label htmlFor="user-name">username</label>
                <input id="user-name" type="text" onChange={nameInput} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={passwordInput} />
            </div>
            <button type="submit" onClick={handleSubmit}>login</button>
        </form>
    )
}

export default Login