// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 3000 }); // Port can be any available port

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     // Log the received message
//     console.log('received: %s', message);

//     // Broadcast the message to all clients (including sender)
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });


const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

// Serve the HTML file
const server = http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket server logic
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
