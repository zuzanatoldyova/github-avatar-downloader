var request = require('request');
var fs = require('fs');
var auth = require('dotenv').config();

if (!fs.existsSync('./.env')) {
    throw new Error('.env file storing credentials is missing');
}

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (! GITHUB_USER || ! GITHUB_TOKEN) {
  throw new Error('missing credentials');
}

// parses data from githubs requested repository and passes them to
// a callback function
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      if (String(response.statusCode).match(/404/)) {
        console.log('Provided repo does not exist');
      } else if (String(response.statusCode).match(/401/)) {
        console.log('Unauthorized repo access')
      } else {
        console.log('Something wrong with the application')
      }
    } else {
      var contributors = JSON.parse(body);
      cb(contributors);
    }
  });
}

module.exports = {
  getRepoContributors: getRepoContributors
};
