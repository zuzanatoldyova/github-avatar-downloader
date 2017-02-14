var request = require('request');
var GITHUB_USER = "zuzanatoldyova";
var GITHUB_TOKEN = "1c8563b432b2c97cb0a77eefc49de460c62d33d7";


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  if(!repoOwner || !repoName) {
    console.log('The input is not valid, please enter repoOwner and repoName');
    return;
  }

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
}