var avatars = require('./avatars_api');
var contributors = require('./contributors_parser');

var userInput = process.argv.slice(2);


contributors.getRepoContributors(userInput[0], userInput[1], avatars.extractAvatars);



