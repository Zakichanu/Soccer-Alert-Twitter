import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();
import functions from './helper/functions';

(async () => {
  try {
    // Instanciate with desired auth type
    const userClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_KEY_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    let fixtures: Array<any> = await functions.getLiveScore()
    for (let index = 0; index < 10; index++) {
      const element = fixtures[index];
      await userClient.v2.tweet(element.teams.home.name + ' ' + element.goals.home + ' - ' + element.goals.away + ' ' + element.teams.away.name);

    }

    
  } catch (error) {
    throw error;
  }


})();
