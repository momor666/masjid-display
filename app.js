var express = require('express');
var app     = express();
var fs      = require('fs');
var bodyParser = require('body-parser');
var ipaddress = '127.0.0.1';
var port      = 3000;

// Side loaded data to serve
var config_details = require('./public/data/config.json');
var iqama_times    = require('./public/data/iqamas.json');

// In order to reload the json files after changing them
require.reload = function reload(path){
  delete require.cache[require.resolve(path)];
  return require(path);
};

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/slides', function(req, res) {
  var names = fs.readdirSync('public/imgs/slides');
  res.send(names);
});

app.get('/config-detail', function(req, res) {
  config_details = require.reload('./public/data/config.json');
  res.send(config_details);
});

app.get('/iqamas', function(req, res) {
  iqama_times = require.reload('./public/data/iqamas.json');
  res.send(JSON.stringify(iqama_times));
});

app.post('/config', function(req, res) {
  fs.writeFile("./public/data/config.json", JSON.stringify(req.body, null, 2), function (err) {
    if (err) {
      res.json({"response": {"status": "ERROR", "code": 500, "message": err }});
    } else {
      res.json({"response": {"status": "OK", "code": 200 }});
    }
  });
  console.log(req.body);
});

app.post('/iqama-update', function(req, res) {
  console.log(req.body);
  fs.writeFile("./public/data/iqamas.json", JSON.stringify(req.body, null, 2), function (err) {
    if (err) {
      res.json({"response": {"status": "ERROR", "code": 500, "message": err }});
    } else {
      res.json({"response": {"status": "OK", "code": 200 }});
    }
  });
});

app.get('/config',function(req,res){    
  res.sendFile(__dirname + '/public/config.html');
});

app.listen(port, ipaddress);
