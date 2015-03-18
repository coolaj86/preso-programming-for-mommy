'use strict';

var process = require('process');

function say(msg) {
  console.log(msg.toString('utf8'));
}

process.stdin.on('data', say);
process.stdin.resume();
