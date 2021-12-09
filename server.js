const express = require('express');
const app = express();
const socket = require('socket.io');

// Start Server
const server = app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});

// Socket.io Setup
const io = socket(server);
