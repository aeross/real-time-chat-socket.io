import React, { useState } from 'react'

function InputMessage({ socket }) {
    const [msg, setMsg] = useState("");

    function handleChange(e) {
        setMsg(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setMsg("");

        socket.emit("message-to-server", msg);
    }


    return (<>
        <form>
            <input type="text" placeholder="type something here..." value={msg} onChange={handleChange} />
            <button onClick={handleSubmit}>submit</button>
        </form>
    </>)
}

export default InputMessage