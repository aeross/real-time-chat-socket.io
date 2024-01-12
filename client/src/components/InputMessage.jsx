import React, { useState } from 'react'

function InputMessage({ socket, messageData }) {
    const { msgs, setMsgs } = messageData;  // the list of messages
    const [msg, setMsg] = useState("");  // the input field

    function handleChange(e) {
        setMsg(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // revert input field into an empty string
        setMsg("");

        // append new message to list of messages
        const newMsgs = [...msgs];
        newMsgs.push(msg);
        setMsgs(newMsgs);

        // send new message to client
        socket.emit("message-to-server", msg, "room value here");
    }


    return (<>
        <form>
            <input type="text" placeholder="type something here..." value={msg} onChange={handleChange} />
            <button onClick={handleSubmit}>submit</button>
        </form>
    </>)
}

export default InputMessage