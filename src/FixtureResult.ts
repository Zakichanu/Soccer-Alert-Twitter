import cron from 'node-cron';
import constants, { fixtureResponse } from '../helper/constants';
import functions from '../helper/functions';

// Function to retrieve the match of the day
const fixturePreview = () => {
    cron.schedule('0 10 * * *', async () => {
        console.log("It's 10 o'clock !!! Match preview of the day...");
        callResult("⏰ Match of the day | ");

    })
}

const fixtureResult = () => {
    cron.schedule('55 23 * * *', async () => {
        console.log("It's almost midnight !!! Match result of the day...");
        callResult("📊 Today's match result | ");

    })
}


const callResult = async (type: string) => {
    console.log("Premier League...")
    let premierLeagueFixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.premierLeague.id);
    constants.premierLeague.fixtureOfTheDay = premierLeagueFixtures;
    constants.listOfTweetsThread.push(type + "#PremierLeague")
    await fillArrayForThreadTweet(constants.premierLeague.fixtureOfTheDay);

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    console.log("Ligue 1...")
    let ligue1Fixtures: Array<fixtureResponse> = await functions.getMatchResult(constants.ligue1.id);
    constants.ligue1.fixtureOfTheDay = ligue1Fixtures;
    constants.listOfTweetsThread.push(type + "#Ligue1")
    await fillArrayForThreadTweet(constants.ligue1.fixtureOfTheDay);

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    console.log("Bundesliga...")
    let bundesligaFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.bundesliga.id);
    constants.bundesliga.fixtureOfTheDay = bundesligaFixtures;
    constants.listOfTweetsThread.push(type + "#Bundesliga")
    await fillArrayForThreadTweet(constants.bundesliga.fixtureOfTheDay);

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    console.log("LaLiga...")
    let laLigaFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.laLiga.id);
    constants.laLiga.fixtureOfTheDay = laLigaFixtures;
    constants.listOfTweetsThread.push(type + "#LaLiga")
    await fillArrayForThreadTweet(constants.laLiga.fixtureOfTheDay);

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    console.log("UCL...")
    let uclFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.ucl.id);
    constants.ucl.fixtureOfTheDay = uclFixtures;
    constants.listOfTweetsThread.push(type + "#UCL")
    await fillArrayForThreadTweet(constants.ucl.fixtureOfTheDay);

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    console.log("Europa League...")
    let europaLeagueFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.europaLeague.id);
    constants.europaLeague.fixtureOfTheDay = europaLeagueFixtures;
    constants.listOfTweetsThread.push(type + "#EL")
    await fillArrayForThreadTweet(constants.europaLeague.fixtureOfTheDay);

    // Waiting 2 minutes to avoid any conflict
    await functions.wait(120000);

    console.log("Serie A...")
    let serieAFixtures : Array<fixtureResponse> = await functions.getMatchResult(constants.serieA.id);
    constants.serieA.fixtureOfTheDay = serieAFixtures;
    constants.listOfTweetsThread.push(type + "#SerieA")

    console.log("Done !");
}

const fillArrayForThreadTweet = async (fixtureResult: Array<fixtureResponse>) => {
    for (const iterator of fixtureResult) {
        const homeGoal: number = iterator.goals.home === null ? 0 : iterator.goals.home;
        const awayGoal: number = iterator.goals.away === null ? 0 : iterator.goals.away;

        const result: string = iterator.teams.home.name + " " + homeGoal +  " - " + awayGoal + " " + iterator.teams.away.name + "\n🕚" + new Date(iterator.fixture.date).getHours() + ":" + (new Date(iterator.fixture.date).getMinutes() < 10 ? '0' : '') + new Date(iterator.fixture.date).getMinutes();
        constants.listOfTweetsThread.push(result);
        console.log(result);
    }
    await functions.tweetThread(constants.userClient);
}
export default { fixturePreview, fixtureResult };