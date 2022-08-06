import dotenv from 'dotenv';
dotenv.config();
import rp from 'request-promise';
import constants, { fixtureResponse } from './constants';


// Wait method
const wait = async (ms: number) => {
    try {
        return new Promise(resolve => setTimeout(resolve, ms));
    } catch (error) {
        throw error;
    }
    
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
            date: new Date().toLocaleDateString("fr-CA", {timeZone: "Europe/Paris"}).slice(0, 10) as string,
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

function getMatchOftheDay (idLeague: number) : Array<fixtureResponse> {
    if(idLeague === constants.premierLeague.id){
        return constants.premierLeague.fixtureOfTheDay;
    }
    else if(idLeague === constants.laLiga.id){
        return constants.laLiga.fixtureOfTheDay;
    }
    else if(idLeague === constants.bundesliga.id){
        return constants.bundesliga.fixtureOfTheDay;
    }
    else if(idLeague === constants.serieA.id){
        return constants.serieA.fixtureOfTheDay;
    }
    else if(idLeague === constants.ligue1.id){
        return constants.ligue1.fixtureOfTheDay;
    }
    else if(idLeague === constants.ucl.id){
        return constants.ucl.fixtureOfTheDay;
    }
    else if(idLeague === constants.europaLeague.id){
        return constants.europaLeague.fixtureOfTheDay;
    };
    return [];
}

export default { executeRequest, getLiveScore, getMatchResult, getLiveScoreAll, wait, getMatchOftheDay };