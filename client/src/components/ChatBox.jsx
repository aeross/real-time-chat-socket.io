import React, { useEffect, useState } from 'react'

function ChatBox({ socket, room, currUser, targetUser }) {
    // the list of messages in the format: { id: [user id], content: [message content] }
    const [msgs, setMsgs] = useState([]);
    // the input field
    const [msgSent, setMsgSent] = useState("");

    console.log(msgs);

    // fetch chat history
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/history/${room}`, {
                headers: { token }
            });
            const resJson = await res.json();

            if (res.ok) {
                setMsgs(resJson);
            }
        })();
    }, [room])

    function handleChange(e) {
        setMsgSent(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // revert input field into an empty string
        setMsgSent("");

        // append new message to list of messages
        setMsgs([...msgs, { id: currUser, content: msgSent }]);

        // send new message to client
        socket.emit("message-to-server", {
            id: currUser,
            content: msgSent
        }, room);
    }

    // receive message broadcasted from server
    socket.on("message-from-server", msgFromServer => {
        console.log(msgs);
        console.log([...msgs, { id: targetUser, content: msgFromServer }]);
        setMsgs([...msgs, { id: targetUser, content: msgFromServer }]);
    })

    return (
        <div className="col-span-3 h-full flex flex-col">
            <div className="border rounded p-2 flex-1">
                {msgs?.map((msg, i) => {
                    return (
                        <div key={i} className={`my-2 ${msg.id === currUser ? "text-right" : ""}`}>
                            <span className={`rounded-lg px-2 py-1 ${msg.id === currUser ? "bg-pink-100" : " bg-slate-100"}`}>
                                {msg.content}
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* input message */}
            <form>
                <input
                    className="my-2 rounded bg-slate-100 border px-2 py-1"
                    type="text"
                    placeholder="type something here..."
                    value={msgSent}
                    onChange={handleChange}
                />
                <button className="px-3 py-1 m-2 border rounded bg-slate-100" onClick={handleSubmit}>
                    submit
                </button>
            </form>
        </div>
    )
}

export default ChatBox