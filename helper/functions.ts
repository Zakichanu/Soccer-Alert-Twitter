import dotenv from 'dotenv';
dotenv.config();
import rp from 'request-promise';
import constants from './constants';





// Calling API
async function executeRequest(method: string, url: string, qs: any, headersHostValue: string, headersTokenValue: string) {
    try {

        var bodyToGet: any;

        const options = {
            method: method,
            url: url,
            qs: qs,
            headers: {
                'X-RapidAPI-Host': headersHostValue,
                'X-RapidAPI-Key': headersTokenValue,
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
        let body = await executeRequest('GET', 'https://api-football-v1.p.rapidapi.com/v3/fixtures', { live: 'all' }, 'api-football-v1.p.rapidapi.com', process.env.RAPID_API_KEY!)

        return body.response as Array<any>;

    } catch (error) {
        throw error;
    }

}


// Function to call api for MatchResult
async function getMatchResult(idLeague: number) {
    try {
        var params = {
            date: new Date().toISOString().slice(0, 10) as string,
            league: idLeague.toString() as string, 
            season: constants.currentSeason.toString() as string
        }
        console.log(params)
        let body = await executeRequest('GET', 'https://api-football-v1.p.rapidapi.com/v3/fixtures', params, 'api-football-v1.p.rapidapi.com', process.env.RAPID_API_KEY!)

        return Promise.all(body.response as Array<any>);

    } catch (error) {
        throw error;
    }


}

export default { executeRequest, getLiveScore, getMatchResult };