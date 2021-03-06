var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var https = require('https');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  nodePath: '/Users/student/.nvm/versions/node/v6.11.3/bin/node'
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (error, data)=>{
    //Passing array of URL strings to callback
    //On error callback invoked with no args
    if (error) {
      callback();
    }
    var response = '';
    response += data;
    var urls = response.split('\n');
    callback(urls);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((data)=>{
    //Iterating over array returning true if URL exists in array
    //Passes boolean result to callback
    if (!data) {
      callback();
    }
    var result = _.some(data, (entry)=> { return url === entry; });
    callback(result);
  });
};

exports.addUrlToList = function(url, callback) {
  //Takes in URL and writes to list with return
  //Throws error on failure otherwise invokes callback with no args
  console.log(url);
  fs.appendFile(exports.paths.list, url + '\n', (error)=>{
    if (error) {
      throw error;
      return;
    } else {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  //takes in url and if it is archived, passes true to callback, else passes false.
  var dir = exports.paths.archivedSites + '/' + url;
  callback(fs.existsSync(dir));
};

exports.downloadUrls = function(urlArray) {
  debugger;
  if (!urlArray) {
    throw error;
  } else {
    _.each(urlArray, (url, index) => {
      console.log('getting html for ', 'https://' + url);
      https.get('https://' + url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          fs.writeFile(exports.paths.archivedSites + '/' + url, data, (error) => {
            if (error) {
              throw error;
            } else {
              console.log('website saved: ' + url);
            }
          });
        });
      });
    });
  }
};
