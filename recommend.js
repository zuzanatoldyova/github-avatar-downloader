var contributors = require('./contributors_parser');
var request = require('request');
var auth = require('dotenv').config();

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

var userInput = process.argv.slice(2);

if (! userInput || !(userInput.length === 2)) {
  console.log('The input is not valid, please enter repoOwner and repoName');
} else {
  contributors.getRepoContributors(userInput[0], userInput[1], getMostStarred);
}

function getMostStarred(contributors){
  for (var contributor of contributors) {
    var options = {
      url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/users/' + contributor.login + '/starred',
      headers: {
        'User-Agent': 'GitHub Avatar Downloader - Student Project',
        'Method': 'GET'
      }
    };
    parseStarred(options, returnOutput);
  }
}

function parseStarred(options, callback){
  request.get(options, function(error, response, body) {
    var starred = JSON.parse(body);
    console.log(starred.length);
    console.log(options.url);
    callback(starred);
  });
}

function returnOutput(input) {
  console.log(input.length);
  var mostStars = 0;
  var mostStarred = '';
  for (var repo of input) {
      console.log(repo.id);
      if (repo.stargazers_count > mostStars) {
            mostStars = repo.stargazers_count;
            mostStarred = repo.id;
      }
    }
  console.log(`${mostStarred} has ${mostStars} stars`);
  return mostStarred;
}