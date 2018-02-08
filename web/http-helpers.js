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
  if (fs.statSync(asset).isDirectory()) {
    asset += 'index.html';
  }
    
  fs.exists(asset, (exist)=>{
    
    if (!exist) {
      res.writeHead(404, 'File Not Found', this.headers); //Error 404 - File Not Found
    } 

    fs.readFile(asset, (error, data)=>{
      if (error) {
        //Error 500 - Internal Server Error
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
