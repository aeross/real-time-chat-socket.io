import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import Chat from "../components/Chat";

function Home() {
    const navigate = useNavigate();
    const socket = io("http://localhost:3000");

    return (<>
        <button className="px-3 py-1 m-2 border rounded bg-slate-100" onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
        }}>Log out</button>

        <div className="px-4 py-6 grid grid-cols-4 gap-2 w-3/4 m-auto min-h-72">
            <Chat socket={socket} />
        </div>
    </>)
}

export default Home