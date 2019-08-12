const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Não é recomendado, guardar isso no banco
const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
    console.log(connectedUsers);

});

mongoose.connect(
    'mongodb+srv://omnistack:omnistack123@cluster-7ghga.mongodb.net/omnistack?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
