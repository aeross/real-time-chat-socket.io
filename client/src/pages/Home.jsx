import { io } from "socket.io-client";
import Chat from "../components/Chat";

function Home() {
    const socket = io("http://localhost:3000");

    socket.emit("join-room", "room value here");

    return (
        <div className="px-4 py-6 grid grid-cols-4 gap-2 w-3/4 m-auto min-h-72">
            <div className="border bg-pink-100 rounded">users list</div>
            <Chat socket={socket} />
        </div>
    )
}

export default Home