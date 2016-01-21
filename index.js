var express = require('express');
var app     = express();

var ipaddress = '127.0.0.1';
var port      = 3000;

app.use(express.static(__dirname + '/public'));

app.listen(port, ipaddress);
