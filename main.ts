import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();
import functions from './helper/functions';
import constants, { fixtureResponse } from './helper/constants';
import FixtureResult from './src/FixtureResult';

(async () => {
  try {
    // Instanciate with desired auth type
    const userClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_KEY_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    // let fixtures: Array<fixtureResponse> = await functions.getLiveScore();
    // for (const key of fixtures) {
    //   console.log(key);
    //   //await userClient.v2.tweet(key.teams.home.name + ' ' + key.goals.home + ' - ' + key.goals.away + ' ' + key.teams.away.name);
    // }
    
    FixtureResult.fixturePreview();
    FixtureResult.fixtureResult();

  } catch (error) {
    throw error;
  }


})();
