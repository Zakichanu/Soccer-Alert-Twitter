import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import cron from 'node-cron';
import FixtureResult from './src/FixtureResult';
import FixtureLive from './src/FixtureLive';
import constants from './helper/constants';
import functions from './helper/functions';
dotenv.config();

(async () => {
  // Instanciate with desired auth type
  const userClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_KEY_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
  });

  // Reseting arrays of fixture of the day
  functions.resetArrays();

  // List of fixtures of the day at the beginning of the day
  FixtureResult.fixturePreview();

  // List of fixtures of the day at the end of the day
  FixtureResult.fixtureResult();

  // Retrieve live score event every 90 seconds
  FixtureLive.liveScore();

  // Check if there is something to tweet
  functions.tweetEveryMinute(userClient);



  

})();
