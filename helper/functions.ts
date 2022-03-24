import dotenv from 'dotenv';
dotenv.config();
import rp from 'request-promise';





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

async function getMatchOfTheDay(){
    
}

export default { executeRequest, getLiveScore };