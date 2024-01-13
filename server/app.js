const express = require("express");
const cors = require('cors');
const Controller = require("./controller");
const ErrorHandler = require("./middlewares/error");
const verifyLogin = require("./middlewares/auth");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// socket.io setup
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

// endpoints
app.post("/login", Controller.login);
app.post("/register", Controller.register);

app.get("/users", verifyLogin, Controller.getUsers);
app.get("/users/:id", verifyLogin, Controller.getUser);
app.get("/user-info", verifyLogin, Controller.getCurrentUser);


// start connection on the server
io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // listen to events sent by a client
    socket.on("message-to-server", (msg, room) => {
        // broadcast event sent by a client to every other client in the room
        if (room === "") {
            socket.broadcast.emit("message-from-server", "you are not in a room");
        } else {
            socket.to(room).emit("message-from-server", msg);
        }

        // socket.broadcast.emit("message-from-server", msg);
    })

    socket.on("join-room", room => {
        console.log(room);
        socket.join(room);
    })
})


app.use(ErrorHandler.handle);

server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});