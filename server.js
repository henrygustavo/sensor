var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname) + '/index.html');
});

app.set('port',(80));

app.listen(app.get('port'));

console.log("here we go");
