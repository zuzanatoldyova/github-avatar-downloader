var request = require('request');
var fs = require('fs');
var path = require('path');

// downloads an image from url and storing to filepath
function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err) {
           throw err;
         })
         .pipe(fs.createWriteStream(filePath)
           .on('error', function(err) {
            throw err;
           })
           .on('finish', function() {
             console.log('avatar downloaded');
           }));
}

// iterates over parsed user data and invokes downloadImageByURL function
function extractAvatars(data) {
  for (var user of data) {
    var filePath = `./avatars/${user.login}.jpg`;
    ensureDirectoryExistence(filePath);
    downloadImageByURL(user.avatar_url, filePath);
  }
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

module.exports = {
  extractAvatars: extractAvatars
};
