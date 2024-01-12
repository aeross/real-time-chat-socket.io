import React, { useState } from 'react'
import InputMessage from "../components/InputMessage";

function Chat({ socket }) {
    const [msgs, setMsgs] = useState([]);

    // socket.on("connect", () => {
    //     const newMsgs = [...msgs];
    //     newMsgs.push("connected");
    //     setMsgs(newMsgs);
    // })

    socket.on("message-from-server", msg => {
        const newMsgs = [...msgs];
        newMsgs.push(msg);
        setMsgs(newMsgs);
    })

    return (
        <div className="col-span-3 h-full flex flex-col">
            <div className="border rounded p-2 flex-1">
                {msgs?.map((msg, i) => {
                    return (<div key={i}>
                        <p>{msg}</p>
                    </div>)
                })}
            </div>
            <InputMessage socket={socket} messageData={{ msgs, setMsgs }} />
        </div>
    )
}

export default Chat