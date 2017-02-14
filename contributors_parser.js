var request = require('request');
var auth = require('dotenv').config();

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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
      console.log('Something wrong with the request');
    } else {
      var contributors = JSON.parse(body);
      cb(contributors);
    }
  });
}

module.exports = {
  getRepoContributors: getRepoContributors
};
