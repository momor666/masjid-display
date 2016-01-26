var express = require('express');
var app     = express();
var fs      = require('fs');
var bodyParser = require('body-parser');
var ipaddress = '127.0.0.1';
var port      = 3000;

// Side loaded data to serve
var config_details = require('./public/data/config.json');
var iqama_times    = require('./public/data/iqamas.json');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/slides', function(req, res) {
  var names = fs.readdirSync('public/imgs/slides');
  res.send(names);
});

app.get('/config', function(req, res) {
  res.send(config_details);
});

app.post('/config', function(req, res) {
  console.log(req.body);
  res.json({"response": {"status": "OK", "code": 200 }});
});

app.get('/iqamas', function(req, res) {
  res.send(iqama_times);
});

app.listen(port, ipaddress);
