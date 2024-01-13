import React, { useState } from 'react'
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';

function Chat({ socket }) {
    // logged-in user and target user (the user that the logged-in user is chatting with)
    const [loggedInUser, setLoggedInUser] = useState();
    const [users, setUsers] = useState();
    const [chattingWith, setChattingWith] = useState();

    // ensures personal chat between those two users
    const [room, setRoom] = useState();

    return (<>
        <Sidebar
            socket={socket}
            setRoom={setRoom}
            userSetup={{ loggedInUser, setLoggedInUser, users, setUsers, chattingWith, setChattingWith }}
        />
        <ChatBox socket={socket} room={room} currUser={+loggedInUser?.userId} targetUser={+chattingWith} />
    </>)
}

export default Chat