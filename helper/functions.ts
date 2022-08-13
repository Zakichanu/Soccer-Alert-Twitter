import rp from 'request-promise';
import constants, { fixtureResponse } from './constants';
import cron from 'node-cron';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();


// Wait method
const wait = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Calling API
async function executeRequest(method: string, url: string, qs: any, headersHostValue: string, headersTokenValue: string) {
    try {
        var bodyToGet: any;

        const options = {
            method: method,
            url: url,
            qs: qs,
            headers: {
                'x-rapidapi-host': headersHostValue,
                'x-apisports-key': headersTokenValue,
                useQueryString: true
            },
            json: true,
        };

        await rp(options)
            .then(function (repos) {
                bodyToGet = repos

            })
            .catch(function (err) {
                throw new Error;
            });

        return bodyToGet;


    } catch (error) {
        throw error;
    }

}

// Function to call api for LiveScore
async function getLiveScore(idLeague: number) {
    try {
        var params = {
            live: 'all',
            league: idLeague,
            season: constants.currentSeason.toString() as string,
            timezone: 'Europe/Paris'
        }
        let body = await executeRequest('GET', 'https://v3.football.api-sports.io/fixtures', params, 'v3.football.api-sports.io', process.env.RAPID_API_KEY!)

        return Promise.all(body.response as Array<any>);

    } catch (error) {
        throw error;
    }

}

// Function to call api for LiveScore
async function getLiveScoreAll() {
    try {
        var params = {
            live: 'all',
            season: constants.currentSeason.toString() as string,
            timezone: 'Europe/Paris'
        }
        let body = await executeRequest('GET', 'https://v3.football.api-sports.io/fixtures', params, 'v3.football.api-sports.io', process.env.RAPID_API_KEY!)

        return Promise.all(body.response as Array<any>);

    } catch (error) {
        throw error;
    }

}


// Function to call api for MatchResult
async function getMatchResult(idLeague: number) {
    try {
        var params = {
            date: new Date().toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" }).slice(0, 10) as string,
            league: idLeague,
            season: constants.currentSeason.toString() as string,
            timezone: 'Europe/Paris'
        }
        let body = await executeRequest('GET', 'https://v3.football.api-sports.io/fixtures', params, 'v3.football.api-sports.io', process.env.RAPID_API_KEY!)

        return Promise.all(body.response as Array<any>);

    } catch (error) {
        throw error;
    }
}

async function getOneMatchResult(idFixture: number): Promise<fixtureResponse> {
    try {
        var params = {
            id: idFixture,
            timezone: 'Europe/Paris'
        }
        let body = await executeRequest('GET', 'https://v3.football.api-sports.io/fixtures', params, 'v3.football.api-sports.io', process.env.RAPID_API_KEY!)

        return body.response[0] as fixtureResponse;

    } catch (error) {
        throw error;
    }
}

function getMatchOftheDay(idLeague: number): Array<fixtureResponse> {
    if (idLeague === constants.premierLeague.id) {
        return constants.premierLeague.fixtureOfTheDay;
    }
    else if (idLeague === constants.laLiga.id) {
        return constants.laLiga.fixtureOfTheDay;
    }
    else if (idLeague === constants.bundesliga.id) {
        return constants.bundesliga.fixtureOfTheDay;
    }
    else if (idLeague === constants.serieA.id) {
        return constants.serieA.fixtureOfTheDay;
    }
    else if (idLeague === constants.ligue1.id) {
        return constants.ligue1.fixtureOfTheDay;
    }
    else if (idLeague === constants.ucl.id) {
        return constants.ucl.fixtureOfTheDay;
    }
    else if (idLeague === constants.europaLeague.id) {
        return constants.europaLeague.fixtureOfTheDay;
    };
    return [];
}

// Resting arrays
const resetArrays = async () => {
    cron.schedule('15 0 * * *', async () => {
        console.log("It's midnight !!! Reset arrays...");
        constants.premierLeague.fixtureOfTheDay = [];
        constants.ligue1.fixtureOfTheDay = [];
        constants.bundesliga.fixtureOfTheDay = [];
        constants.laLiga.fixtureOfTheDay = [];
        constants.ucl.fixtureOfTheDay = [];
        constants.europaLeague.fixtureOfTheDay = [];
        constants.serieA.fixtureOfTheDay = [];
        console.log("Done !");
    })
};

// Tweeting every minute
const tweetEveryMinute = async (userClient: TwitterApi) => {
    cron.schedule('*/1 * * * *', async () => {
        console.log("Tweet every minute...");
        while(constants.listOfTweets?.length > 0) {
            await userClient.v2.tweet(constants.listOfTweets.shift()!);
        }
        console.log("Done !");
    }).start();
}

// Tweeting thread
const tweetThread = async (userClient: TwitterApi) => {
    console.log("Tweet thread...");
    if(constants.listOfTweetsThread?.length > 0) {
        await userClient.v2.tweetThread(constants.listOfTweetsThread!);
    }
    // Reset array
    constants.listOfTweetsThread = [];
    console.log("Done !");
}

export default { executeRequest, getOneMatchResult, getLiveScore, getMatchResult, getLiveScoreAll, wait, getMatchOftheDay, resetArrays, tweetEveryMinute, tweetThread };