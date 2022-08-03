import dotenv from 'dotenv';
dotenv.config();
import rp from 'request-promise';
import constants from './constants';


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
async function getLiveScore() {
    try {
        let body = await executeRequest('GET', 'https://v3.football.api-sports.io/fixtures', { live: 'all', timezone: 'Europe/Paris' }, 'v3.football.api-sports.io', process.env.RAPID_API_KEY!)

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
            league: idLeague.toString() as string, 
            season: constants.currentSeason.toString() as string,
            timezone: 'Europe/Paris'
        }
        console.log({params})
        let body = await executeRequest('GET', 'https://v3.football.api-sports.io/fixtures', params, 'v3.football.api-sports.io', process.env.RAPID_API_KEY!)

        return Promise.all(body.response as Array<any>);

    } catch (error) {
        throw error;
    }


}

export default { executeRequest, getLiveScore, getMatchResult };