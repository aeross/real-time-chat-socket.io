import React, { useState } from 'react'
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';

function Chat({ socket }) {
    const [room, setRoom] = useState();

    return (<>
        <Sidebar socket={socket} roomSetup={{ room, setRoom }} />
        <ChatBox socket={socket} room={room} />
    </>)
}

export default Chat