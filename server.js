const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 }); // Port can be any available port

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Log the received message
    console.log('received: %s', message);

    // Broadcast the message to all clients (including sender)
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
