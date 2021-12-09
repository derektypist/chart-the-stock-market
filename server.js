const express = require('express');
const app = express();

app.use('/public',express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Index Page (Static HTML)
app.route('/')
  .get(function (req,res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });


// Start Server
app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});

