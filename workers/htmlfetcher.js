// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

console.log('in htmlFetcher');
archive.readListOfUrls((data) => {
  console.log(data);
  //data is an array of urls
  var urlArray = [];
  _.each(data, (url, index) => {
    archive.isUrlArchived(url, (isArchived) => {
      if (isArchived) {
        return;
      } else {
        urlArray.push(url);
      }
    });
  });
  archive.downloadUrls(urlArray);

});
