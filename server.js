'use strict';

var express = require('express');
var app = express();

app.use(express.static('.'));

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
