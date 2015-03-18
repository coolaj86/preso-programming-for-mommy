'use strict';

var process = require('process');
var web = require('./web-module');
var server = web.server;
var websocket = web.websocket;

function say(msg) {
  console.log(msg.toString());
}

function handleConnection(customer) {
  console.log("someone connected");

  function reply(msg) {
    customer.send(msg.toString(), function() { /* ignore errors */ });
  }

  customer.on('message', say);
  process.stdin.on('data', reply);
}


function unpauseStdin() {
  process.stdin.resume();
  say("http://127.0.0.1:3080/");
}

// This hands an object to 'handleConnection'
// just like we handed a string to 'say' previously
websocket.on('connection', handleConnection);
server.on('listening', unpauseStdin);
server.listen(3080);
