const express = require('express');
const app = express();
const socket = require('socket.io');

// Index Page (Static HTML)
app.route('/')
  .get(function (req,res) {
    res.sendFile(process.cwd + '/views/index.html');
  });


// Start Server
app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});

