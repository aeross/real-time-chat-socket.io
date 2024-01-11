import { io } from "socket.io-client";
import InputMessage from "./components/InputMessage";
import Chat from "./components/Chat";

function App() {
  const socket = io("http://localhost:3000");

  // NOTE: every single socket method (e.g., `socket.on`, `socket.emit`)
  // must not be in this component. This is in order to avoid re-render
  // on this component, which in turn will re-render the socket id 
  // connection the client is connected to.

  // Do not put any socket method in this component.

  return (
    <div>
      <h1>Chat</h1>
      <Chat socket={socket} />
      <InputMessage socket={socket} />
    </div>
  )
}

export default App
