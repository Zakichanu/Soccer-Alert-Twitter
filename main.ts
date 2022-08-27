import dotenv from 'dotenv';
import FixtureResult from './src/FixtureResult';
import FixtureLive from './src/FixtureLive';
import functions from './helper/functions';
import constants from './helper/constants';
dotenv.config();

(async () => {
  

  // Reseting arrays of fixture of the day
  functions.resetArrays();

  // List of fixtures of the day at the beginning of the day
  FixtureResult.fixturePreview();

  // List of fixtures of the day at the end of the day
  FixtureResult.fixtureResult();

  // Retrieve live score event every 90 seconds
  FixtureLive.liveScore();

  // Check if there is something to tweet
  functions.tweetEveryMinute(constants.userClient);



  

})();
