var avatars = require('./avatars_api');
var contributors = require('./contributors_parser');

// application getting and validating the user input,
// using modules to iterate and download all avatars
// from requested github repository
var userInput = process.argv.slice(2);

if (! userInput || !(userInput.length === 2)) {
  console.log('The input is not valid, please enter repoOwner and repoName');
} else {
  contributors.getRepoContributors(userInput[0], userInput[1], avatars.extractAvatars);
}
