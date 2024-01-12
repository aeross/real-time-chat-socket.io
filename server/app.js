const express = require("express");
const cors = require('cors');
const Controller = require("./controller");
const ErrorHandler = require("./middlewares/error");
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


// start connection on the server
io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // listen to events sent by a client
    socket.on("message-to-server", msg => {
        // broadcast event sent by a client to every other clients
        socket.broadcast.emit("message-from-server", msg);
    })
})


app.use(ErrorHandler.handle)
server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});