$(function () {
  'use strict';

  var wsUri = 'ws://127.0.0.1:3080/';
  var websocket;
  var messages = [];

  function receiveMessage(event) {
    messages.push(event.data);

    $('ul').html('');
    messages.forEach(function (msg) {
      $('ul').append('<li>' + msg.replace(/</g, '&lt;') + '</li>');
    });
  }

  function sendMessage(event) {
    event.preventDefault();

    var msg = $('.js-my-message').val();
    receiveMessage({ data: msg });
    websocket.send(msg);
  }

  websocket = new WebSocket(wsUri);
  websocket.addEventListener('message', receiveMessage);

  $('body').on('submit', 'form.js-send-message', sendMessage);
});
