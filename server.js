const express = require('express');
const app = express();
const socket = require('socket.io');

// Start Server
app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});

