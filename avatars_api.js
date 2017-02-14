var request = require('request');
var fs = require('fs');

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err) {
           throw err;
         })
         .pipe(fs.createWriteStream(filePath)
           .on('finish', function() {
             console.log('avatar downloaded');
           }));
}

function extractAvatars(data) {
  for (var user of data) {
    var filePath = `./avatars/${user.login}.jpg`;
    downloadImageByURL(user.avatar_url, filePath);
  }
}

module.exports = {
  extractAvatars: extractAvatars
};
