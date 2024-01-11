const express = require("express");
const cors = require('cors')
const app = express();
const port = 3000;

// ensure no CORS error
app.use(cors());

// socket.io setup
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});


app.get("/", function(req, res) {
    res.send("Hello world");
});

// start connection on the server
io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // listen to events sent by a client
    socket.on("message-to-server", msg => {
        // broadcast event sent by a client to every other clients
        socket.broadcast.emit("message-from-server", msg);
    })
})


server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});