var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var url = require('url');

var methods = {
  GET: (req, res) => {
    console.log('GET Request Received!');
    var parsedUrl = url.parse(req.url);
    var pathName = `./web/public${parsedUrl.pathname}`;
    console.log('pathname = ' + pathName);
    httpHelpers.serveAssets(res, pathName, (data)=>{
      if (res.statusCode === 200) {
        res.statusCodeMessage = 'OK';
      }
      res.writeHead(res.statusCode, res.statusCodeMessage, httpHelpers.headers);
      res.end(data);
    });
  },
  POST: (req, res)=>{
    console.log('POST Received');
    var body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      var post = JSON.parse(body);
      console.log('Received POST = ' + post);
      
      res.writeHead(200, 'OK', httpHelpers.headers);
      res.end();
    });
  },
  OPTIONS: (req, res)=>{
    
  }
};

exports.handleRequest = function (req, res) {
  var method = methods[req.method];
  if (method) {
    method(req, res);
  } else {
    res.statusCode = 402; //402 Error - Invalid Method
    res.statusCodeMessage = 'Invalid Method';
    res.writeHead(res.statusCode, res.statusCodeMessage, httpHelpers.headers);
    res.end();
  }
};
