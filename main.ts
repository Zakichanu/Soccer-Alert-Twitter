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


  functions.resetArrays();
  FixtureResult.fixturePreview();
  FixtureResult.fixtureResult();
  FixtureLive.liveScore();
  functions.tweetEveryMinute(userClient);



  

})();
