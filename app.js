var express = require('express');
var app     = express();
var fs      = require('fs');
var ipaddress = '127.0.0.1';
var port      = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/slides', function(req, res) {
  var names = fs.readdirSync('public/imgs/slides');
  res.send(names);
});

app.listen(port, ipaddress);
