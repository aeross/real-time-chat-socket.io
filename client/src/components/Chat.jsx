import React, { useState } from 'react'

function Chat({ socket }) {
    const [state, setState] = useState();

    socket.on("connect", () => {
        setState(`Connected with id ${socket.id}`);
    })

    socket.on("message-from-server", msg => {
        setState(msg);
    })

    return (<>
        <div>{state}</div>
    </>)
}

export default Chat