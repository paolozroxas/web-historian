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
      res.writeHead(200, 'Okay!', httpHelpers.headers);
      res.end(data);
    });
  },
  POST: (req, res)=>{
    
  },
  OPTIONS: (req, res)=>{
    
  }
};

exports.handleRequest = function (req, res) {
  var method = methods[req.method];
  if (method) {
    method(req, res);
  } else {
    //402 Error - Invalide Method
  }
};
