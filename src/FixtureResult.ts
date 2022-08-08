import cron from 'node-cron';
import constants, { fixtureResponse } from '../helper/constants';
import functions from '../helper/functions';

// Function to retrieve the match of the day
const fixturePreview = () => {
    cron.schedule('0 10 * * *', async () => {
        console.log("It's 10 o'clock !!! Match preview of the day...");
        callResult();
        
    })
}

const fixtureResult = () => {
    cron.schedule('55 23 * * *', async () => {
        console.log("It's almost midnight !!! Match result of the day...");
        callResult();
        
    })
}


const callResult = async () => {
    try {
        console.log("Premier League...")
        let premierLeagueFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.premierLeague.id);
        constants.premierLeague.fixtureOfTheDay = premierLeagueFixtures;
        console.log(constants.premierLeague.fixtureOfTheDay);

        console.log("Ligue 1...")
        let ligue1Fixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.ligue1.id);
        constants.ligue1.fixtureOfTheDay = ligue1Fixtures;
        console.log(constants.ligue1.fixtureOfTheDay);

        console.log("Bundesliga...")
        let bundesligaFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.bundesliga.id);
        constants.bundesliga.fixtureOfTheDay = bundesligaFixtures;
        console.log(constants.bundesliga.fixtureOfTheDay);

        console.log("LaLiga...")
        let laLigaFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.laLiga.id);
        constants.laLiga.fixtureOfTheDay = laLigaFixtures;
        console.log(constants.laLiga.fixtureOfTheDay);

        console.log("UCL...")
        let uclFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.ucl.id);
        constants.ucl.fixtureOfTheDay = uclFixtures;
        console.log(constants.ucl.fixtureOfTheDay);

        console.log("Europa League...")
        let europaLeagueFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.europaLeague.id);
        constants.europaLeague.fixtureOfTheDay = europaLeagueFixtures;
        console.log(constants.europaLeague.fixtureOfTheDay);

        console.log("Serie A...")
        let serieAFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.serieA.id);
        constants.serieA.fixtureOfTheDay = serieAFixtures;
        console.log(constants.serieA.fixtureOfTheDay);

        console.log("Done !");
    } catch (error) {
        throw error;            
    }
}
export default {fixturePreview, fixtureResult};