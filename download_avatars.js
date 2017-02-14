var avatars = require('./avatars_api');
var contributors = require('./contributors_parser');

// application getting and validating the user input,
// using modules to iterate and download all avatars
// from requested github repository
var userInput = process.argv.slice(2);
var repoOwner = userInput[0];
var repoName = userInput[1];

if(!repoOwner || !repoName) {
  console.log('The input is not valid, please enter repoOwner and repoName');
} else {
  contributors.getRepoContributors(repoOwner, repoName, avatars.extractAvatars);
}
