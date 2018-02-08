var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {

  fs.exists(asset, (exist)=>{

    if (!exist) {
      res.statusCode = 404; //Error 404 - File Not Found
      res.statusCodeMessage = 'File Not Found'; 
      callback();
      return;
    } 
    if (fs.statSync(asset).isDirectory()) {
      asset += 'index.html';
    }

    fs.readFile(asset, (error, data)=>{
      if (error) {
        res.statusCode = 500; //Error 500 - Internal Server Error
        res.statusCodeMessage = 'Internal Server Error'; 
        callback();
        return;
      } else {
        callback(data);
      }
    });
    
  });
  
  
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
