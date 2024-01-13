import React, { useEffect, useState } from 'react'

function Sidebar({ socket, setRoom, userSetup }) {
    const { loggedInUser, setLoggedInUser, users, setUsers, chattingWith, setChattingWith } = userSetup;

    // create room name (function params ===> must be user id)
    function createRoom(user1, user2) {
        if (!user1 || !user2) return "";

        // format for room name is as follows: [user with smaller id]-[user with larger id]
        if (user1 > user2) {
            return `${user2}-${user1}`;
        }
        return `${user1}-${user2}`;
    }

    const token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            // fetch all users
            const res = await fetch("http://localhost:3000/users", {
                headers: { token }
            })
            const resJson = await res.json();

            if (res.ok) {
                setUsers(resJson);
                setChattingWith(resJson[0].id);
            }

            // fetch currently logged in user
            const res2 = await fetch("http://localhost:3000/user-info", {
                headers: { token }
            });
            const resJson2 = await res2.json();

            if (res2.ok) {
                setLoggedInUser(resJson2)
            }

            const userRoom = createRoom(resJson[0].id, resJson2.userId);
            setRoom(userRoom);
            socket.emit("join-room", userRoom);
        })();
    }, []);

    useEffect(() => {
        const newRoom = createRoom(loggedInUser?.userId, chattingWith);
        setRoom(newRoom);
        socket.emit("join-room", newRoom);
    }, [chattingWith])


    return (
        <form className="border bg-slate-200 rounded">
            <select className="m-2 p-1 rounded" defaultValue={chattingWith} onChange={(e) => {
                setChattingWith(e.target.value);
            }}>
                {users?.map(user => {
                    return (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    )
                })}
            </select>
        </form>
    )
}

export default Sidebar