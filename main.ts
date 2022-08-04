import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import { fixtureResponse } from './helper/constants';
import functions from './helper/functions';
import FixtureResult from './src/FixtureResult';
import FixtureLive from './src/FixtureLive';
dotenv.config();

(async () => {
  try {
    // Instanciate with desired auth type
    const userClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_KEY_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

  
    // let fixtures: Array<fixtureResponse> = await functions.getLiveScoreAll();
    // console.log(fixtures[0].fixture.status);
    // for (const key of fixtures) {
    //   console.log(key);
    //   //await userClient.v2.tweet(key.teams.home.name + ' ' + key.goals.home + ' - ' + key.goals.away + ' ' + key.teams.away.name);
    // }
    
    FixtureResult.fixturePreview();
    FixtureResult.fixtureResult();
    FixtureLive.liveScore();


  } catch (error) {
    throw error;
  }


})();
