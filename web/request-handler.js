var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var url = require('url');

var methods = {
  GET: (req, res) => {
    console.log('GET Request Received!');
    var parsedUrl = url.parse(req.url);
    var pathName = archive.paths.siteAssets + parsedUrl.pathname;
    console.log('pathname = ' + pathName);
    httpHelpers.serveAssets(res, pathName, (data)=>{
      if (res.statusCode === 200) {
        res.statusCodeMessage = 'OK';
      }
      res.writeHead(res.statusCode, res.statusCodeMessage, httpHelpers.headers);
      //archive.downloadUrls(['www.amazon.com', 'www.safeway.com', 'www.google.com', 'www.facebook.com']);
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
      var post = body.substring(4);
      console.log('Received POST = ' + post);
      if (!(post.substring(0, 3) === 'www')) {
        res.writeHead(500, 'Internal Server Error', httpHelpers.headers);
        res.end('');
        return;
      }
      archive.isUrlInList(post, (inList) => {
        //case: not in list
        if (!inList) {
          archive.addUrlToList(post, () => {
            httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', (data) => {
              if (res.statusCode === 200) {
                res.statusCodeMessage = 'OK';
              }
              res.writeHead(res.statusCode, res.statusCodeMessage, httpHelpers.headers);
              res.end(data);
            });
          });
        } else {
          archive.isUrlArchived(post, (isArchived) => {
            //case: in list, not in archive
            if (!isArchived) {
              httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', (data) => {
                if (res.statusCode === 200) {
                  res.statusCodeMessage = 'OK';
                }
                res.writeHead(res.statusCode, res.statusCodeMessage, httpHelpers.headers);
                res.end(data);
              });
            } else {
              //case: in list, in archive
              httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + post, (data) => {
                if (res.statusCode === 200) {
                  res.statusCodeMessage = 'OK';
                }
                res.writeHead(res.statusCode, res.statusCodeMessage, httpHelpers.headers);
                res.end(data);
              });
            }
          });
        }
      });
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
