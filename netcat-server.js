'use strict';

var process = require('process');
var net = require('net');
var server = net.createServer();

// We put resume into a function, so that we can do it later
function unpauseStdin() {
  process.stdin.resume();
}

// say is the same as it has always been
function say(msg) {
  console.log(msg.toString('utf8'));
}

function handleConnection(customer) {
  say("Someone connected!");

  // we need a way to reply to the customer
  function reply(msg) {
    customer.write(msg);
  }

  customer.on('data', say);
  process.stdin.on('data', reply);
}

// This hands an object to 'handleConnection'
// just like we handed a string to 'say' previously
server.on('connection', handleConnection);
server.on('listening', unpauseStdin);
server.listen(3080);
