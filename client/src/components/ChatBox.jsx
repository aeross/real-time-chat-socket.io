import React, { useEffect, useState } from 'react'

function ChatBox({ socket, room }) {
    const [msgs, setMsgs] = useState([]); // the list of messages
    const [msgSent, setMsgSent] = useState("");  // the input field


    function handleChange(e) {
        setMsgSent(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // revert input field into an empty string
        setMsgSent("");

        // append new message to list of messages
        setMsgs([...msgs, msgSent]);

        // send new message to client
        socket.emit("message-to-server", msgSent, room);
    }

    // receive message broadcasted from server
    socket.on("message-from-server", msgFromServer => {
        setMsgs([...msgs, msgFromServer]);
    })

    return (
        <div className="col-span-3 h-full flex flex-col">
            <div className="border rounded p-2 flex-1">
                {msgs?.map((msg, i) => {
                    return (<div key={i} className="my-2">
                        <span className="rounded-lg bg-slate-100 px-2 py-1">{msg}</span>
                    </div>)
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
                <button className="px-3 py-1 m-2 border rounded bg-slate-100" onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default ChatBox