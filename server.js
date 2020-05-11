const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// fix to create
const file = {
  "urlBack": "//connecting-health.herokuapp.com"
};
fs.writeFile(__dirname + '/dist/ConectarSaludBackOffice/assets/config/config.json', JSON.stringify(file, null, 2), function writeJSON(err) {
  if (err) return console.log(err);
});

// Serve static files....
app.use(express.static(__dirname + '/dist/ConectarSaludBackOffice'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ConectarSaludBackOffice/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
