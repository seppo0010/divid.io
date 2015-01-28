// #define SERVER
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Preprocessor = require('preprocessor');
var fs = require('fs');
var socketio_server = require('../lib/models/socketio-server.js');
var socket;

server.listen(8000);

app.use(express.static('public'));
app.use(express.static('../../browser/lib'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socketio_server(socket);
});
