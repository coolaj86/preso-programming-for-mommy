'use strict';

var path = require('path');
var http = require('http');

var server = http.createServer();
var WebSocketServer = require('ws').Server;
var websocket = new WebSocketServer({ server: server });

var express = require('express');
var app = express();

var publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

server.on('request', app);
module.exports.server = server;
module.exports.websocket = websocket;
